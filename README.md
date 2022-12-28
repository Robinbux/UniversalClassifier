# Universal Classifier

A platform for classifying generic images using the CLIP technology.

## Installation

To install the dependencies for the frontend, navigate to the frontend directory and run:

```bash
npm install
```
To install the dependencies for the backend, navigate to the backend directory and run:

```bash
pip install -r requirements.txt
```
Running the project locally

To run the frontend locally, navigate to the frontend directory and run:

```bash
npm start
```
This will start the frontend server on http://localhost:3000.

To run the backend locally, navigate to the backend directory and run:

```bash
python manage.py runserver
```
This will start the backend server on http://localhost:8000.

You can access the backend API documentation at http://localhost:8000/docs/.

## Usage

To classify images, input a set of potential classes and upload the images you want to classify. The platform will show the classified class and the confidence of the classification.

## Technologies

This project uses React for the frontend and Django with Python for the backend. The classifier is powered by the CLIP technology.

It was tested on npm version **9.2.0** and python version **3.10**