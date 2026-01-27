import userService from "../services/userService.js";

async function getMe(req, res, next) {
  try {
    const user = req.user;
    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    console.error("Error fetching user info:", err.message);
    next(err);
  }
}

async function register(req, res, next) {
  try {
    const { username, password, role } = req.body;
    const user = await userService.register(username, password, role);
    res.status(201).json(user);
  } catch (err) {
    console.error("Error registering user:", err.message);
    if (err.message === "Username and password are required") {
      return res.status(400).json({ error: err.message });
    }
    if (err.message === "User already exists") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.json({ token });
  } catch (err) {
    console.error("Error logging in user:", err.message);
    if (err.message === "Username and password are required") {
      return res.status(400).json({ error: err.message });
    }
    if (err.message === "User not found or invalid username or password") {
      return res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

export default { getMe, register, login };
