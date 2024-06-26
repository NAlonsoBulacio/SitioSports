const { Order } = require("../db");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { cleanData } = require("../helpers/cleanOrder");
const { postFirstOrderController } = require("./postFirstOrderController");
const { putOrderController } = require("./putOrderController");
const { v4: uuidv4 } = require("uuid");

// const { MERCADOPAGO_API_KEY } = process.env;
const MERCADOPAGO_API_KEY =
  "APP_USR-6101811384872882-050519-c4e446af9a14aca7a7dc65a10ce629e8-1800686060";
const { updateStock } = require("../helpers/updateStock");

const createOrder = async (req, res) => {
  const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_API_KEY });
  const preference = new Preference(client);
  const products = req.body.productInfo;
  const payer = req.body.payerInfo;
  console.log(payer);
  const order_id = uuidv4();
  try {
    let firstOrder;
    if (payer) {
      const client_email = payer.email;
      firstOrder = await postFirstOrderController(order_id, client_email);
    }
    const order_number = firstOrder.order_number;

    const items = products?.map((product) => ({
      title: product.name,
      unit_price: Number(product.price),
      currency_id: "ARS",
      quantity: product.quantity,
      description: product.size,
      id: product.id,
      category_id: Number(product.variant.id),
    }));
    const body = {
      shipments: {
        receiver_address: {
          zip_code: payer.zipCode,
          street_name: payer.street,
          street_number: payer.streetNumber,
          floor: payer.floor,
          apartment: payer.aclaration,
          city_name: payer.city,
          state_name: payer.state,
          country_name: "Argentina",
          aclaration: payer.aclaration,
        },
      },

      payer: {
        phone: {
          number: payer.phone,
        },
        email: payer.email,
        name: payer.payerName,
      },
      external_reference: order_id,
      items: items,
      //cambiar urls con las de verda!
      notification_url: "https://d2ea-131-161-239-212.ngrok-free.app/webhook",
      back_urls: {
        success: `https://sitio-sports.vercel.app/orden-mp-confirmada/${order_number}`,
        failure: `https://sitio-sports.vercel.app/orden-mp-rechazada/${order_number}`,
        pending: `https://sitio-sports.vercel.app/orden-mp-pendiente/${order_number}`,
      },
      auto_return: "approved",
    };

    const result = await preference.create({
      body,
    });

    res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const receiveWebhook = async (req, res) => {
  const paymentId = req.query.id;
  const type = req.body.type;
  const topic = req.body.topic;
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${MERCADOPAGO_API_KEY}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      const order_id = data.external_reference;
      console.log("separando 1000");
      console.log(data);
      console.log("separando1");
      const cleanedItems = cleanData(data);
      console.log(cleanedItems);
      console.log("separando");
      const update =
        cleanedItems.status === "approved"
          ? updateStock(cleanedItems.items)
          : "";
      const orderUpdate = putOrderController(order_id, cleanedItems);
    }

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

module.exports = {
  createOrder,
  receiveWebhook,
};
