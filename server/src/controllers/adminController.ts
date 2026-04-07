import { Request, Response } from "express";
import bcrypt from "bcrypt";

import models from "../models/index.js";

const { User } = models;

async function changeUserPassword() {}

export default {
  changeUserPassword,
};