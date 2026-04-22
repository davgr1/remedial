const logoutController = {};

logoutController.logout = async (req, res) => {
  res.clearCookie("authCookie");
  res.clearCookie("authDriverCookie");
  return res.status(200).json({ message: "Sesion cerrada correctamente" });
};

export default logoutController;