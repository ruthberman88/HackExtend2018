from blockbusters.app import db
import argparse


def init_db():
    db.create_all()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('command', help='command to execute', choices=['init_db'])

    args = parser.parse_args()
    cmd = globals().get(args.command)
    if cmd is None:
        # should never happen
        return

    cmd()


if __name__ == '__main__':
    main()