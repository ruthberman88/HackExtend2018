from setuptools import setup, find_packages

setup(
    name='blockbusters',
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
            'blockbusters_api_server=blockbusters_api_server.app:main',
            'blockbusters_api_manage=blockbusters_api_server.scripts.manage:main'
        ],
    },
    data_files=[('static', 'blockbusters/build/index.html')],
    package_dir={
    }
)
