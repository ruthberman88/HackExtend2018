from setuptools import setup, find_packages

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
            'blockbusters_api_server=blockbusters.app:main',
            'blockbusters_api_manage=blockbusters.scripts.manage:main'
        ],
    },
    package_dir={
    }
)
