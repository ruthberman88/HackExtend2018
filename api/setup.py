from setuptools import setup, find_packages
from setuptools.command.build_ext import build_ext as _build_ext

setup(
    name='blockbusters-api-server',
    version='1.0',
    description='API server for blockbusters game',
    setup_requires=[
    ],
    install_requires=[
        'flask',
        'sqlalchemy',
        'flask-socketio',
        'flask-session',
        'flask_sqlalchemy',
        'gevent',
        'gevent-websocket'
    ],
    packages=find_packages(),
    entry_points={
        'console_scripts': [
            'test_pose_metrics=pose_metrics.test:main'
        ],
    },
    package_dir={
    }
)
