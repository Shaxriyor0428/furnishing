class PaymeController {
  async pay(req, res, next) {
    try {
      res.status(200).json({ message: 'Payment processing...' });
    } catch (error) {
      next(error);
    }
  }

  async checkout(req, res, next) {
    try {
      res.status(200).json({ message: 'Checkout processing...' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymeController();
