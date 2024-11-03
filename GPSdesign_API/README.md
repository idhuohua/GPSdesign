# GPSdesign-api

API server for GPSdesign.

## Intro

### Key Dependencies

- `Python` : Run `python --version` to check if Python is installed. Create a virtual environment using Python 3. The development environment uses Python version 3.9.18. Due to compatibility issues with certain dependencies, versions above Python 3.11 are not supported.
- `Flask` : A lightweight backend API service framework.
- `Pymongo` : A Python library for interacting with MongoDB.
- `MongoDB` : A NoSQL database used to store user data and experiment data.
- `OpenAI` : A Python library for interacting with OpenAI services.

### Project Architecture

The project structure is as follows:

```sh
├── agent
├── app.py
├── apps
├── config.py
├── README.md
├── settings

```

- App : `app.py` is the entry point of the project. You can configure the application’s port and other settings here.
- Routes: Routes are defined in `./apps/routes.py`. New routes and route collections can easily be added following a similar approach. For more information, refer to Flask’s documentation on blueprints: <https://flask.palletsprojects.com/en/3.0.x/blueprints/>

- Prompts: Designers can write prompts in `./settings`. Developers can dynamically call these prompts within the program using templates for flexibility and ease of use.
- Logic: The backend’s logic resides in `apps/${app_name}`. Currently, only one app is implemented. If a new app is required, a new folder can be created, and its logic added. Be sure to include the new `APP_ID` in `./config.py`.
- Algorithm Invocation: The modules for algorithm invocation are located in the `agent` directory. Currently, both Stable Diffusion (SD) and GPT are supported. The SD module includes an instance pool that enables load balancing across multiple SD instances, improving generation efficiency (this requires multiple SD instances to be running).
- Configuration File: The configuration file is located in `./config.py`, where you can modify settings such as:
  - APP IDs
  - Stable Diffusion service API paths
  - OpenAI GPT service configurations
  - Database settings

**Note:**
1. The Stable Diffusion service is not used in GPSdesign.
2. Add your API_KEY to the corresponding file of `./config.py`.

### Data Transfer

Data transfer between the frontend and backend follows standard HTTP request conventions. All requests that modify the database or use generative capabilities should be made using `POST` requests, while all other query-based requests should use `GET` requests.

When sending text data from the frontend to the backend via a `POST` request, the data should be passed in JSON format within the body of the request. The frontend must also include the header `"Content-Type": "application/json"`. Here’s an example of a frontend request:

```javascript
const res = await fetch(`${baseUrl}/paint/start`, {
  method: 'POST',
  body: JSON.stringify({
    username,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
})
```

On the backend, the corresponding route handler retrieves the data from the request body and processes it as follows:

```python
@apps.route('/paint/start', methods=['POST'])
def paintStart():
    try:
        username = request.json.get('username')
        if username == '':
            raise BusinessException(BUSINESS_FAIL, 'User name cannot be empty')
        ...
```

**Note:** Currently, all data transmissions are processed using JSON format. MongoDB stores all information in JSON format, and PNG images are saved in the `../images` directory. To modify file paths, you can use the `./apps/designWeb/logic.py` file. Please ensure that the folder exists before saving the image.

### Large Model Integration

The system currently integrates two large models: GPT-4 and DALL-E-3. The code for these models is located in the `agent` directory.

- GPT-4: Text generation capabilities are provided by GPT-4 from OpenAI, and the project accesses the service through OpenAI’s API. The system implements a `chat` interface to provide prompts and generate the required text.
- DALL-E-3: Image generation is provided by OpenAI's DALL-E-3, which the project accesses through OpenAI's API. The system implements a `t2i` interface that provides prompts and generates the desired images.

## Quick start

1. Set up the environment and install dependencies (if you already have an environment, you can directly install dependencies).
   Run `py -3 -m venv venv` to do this. If the package body is missing, install it using the `pip insatll` command.

2. Switch to the installed `venv` environment by running `venv\Scripts\activate`.

3. Ensure that all backend services are running properly and configured correctly, and that the services are accessible:

   - The OpenAI API service
   - The MongoDB database has been started.

4. Start the project in the `venv` virtual environment with `python app.py`. The project will default to running on port `localhost:5000`, which can be modified in the `app.py` file.
