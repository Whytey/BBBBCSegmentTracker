import unittest

from tracker.config import Production


class MyTestCase(unittest.TestCase):
    def test_production_config(self):
        config = Production()

        self.assertEqual(config.ENV, 'prod')


if __name__ == '__main__':
    unittest.main()
