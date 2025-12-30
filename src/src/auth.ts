import { ethers } from "ethers";
import jwt from "jsonwebtoken";

export function authenticate(address: string, signature: string) {
  const message = "Login Pillar Network";
  const recovered = ethers.verifyMessage(message, signature);

  if (recovered.toLowerCase() !== address.toLowerCase()) {
    throw new Error("Invalid signature");
  }

  const token = jwt.sign(
    { address },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "7d" }
  );

  return { token };
}
