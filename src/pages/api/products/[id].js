import dbConnect from "util/mongo";
import Product from "models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.token;
  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not Authenticated to put!");
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  if (method === "DELETE") {
    console.log("has no token:" + !token);
    console.log("token is not equal:" + token !== process.env.token);
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not Authenticated to delete!");
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json(`The product(${id}) has been deleted!`);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
