from flask.helpers import get_debug_flag

from tracker import create_app
from tracker.config import Production, Development

CONFIG = Development if get_debug_flag() else Production

app = create_app(CONFIG)

# For running in dev, need to actually run the app!
if __name__ == '__main__':
    app.run(debug=True)