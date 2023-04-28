import unittest

class Test(unittest.TestCase):

    def setUp(self) -> None:
        self.maxDiff = None
        return

    def tearDown(self) -> None:
        return


if __name__ == '__main__':
    unittest.main()
