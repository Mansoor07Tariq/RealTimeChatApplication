# Django and React Project

This project is a Real Time Chat Application in which users can create rooms with passkeys and chat with each other in real time built using Django for the backend and React for the frontend.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd RealTimeChatApplication
    ```

3. Set up the backend:

    - Navigate to the `backend` directory:
    
        ```bash
        cd backend
        ```
        
    - Install the required Python packages:
    
        ```bash
        pip install -r requirements.txt
        ```
        
    - Apply migrations:
    
        ```bash
        python manage.py migrate
        ```
        
    - Run the Django development server:
    
        ```bash
        python manage.py runserver
        ```

4. Set up the frontend:

    - Navigate to the `frontend` directory:
    
        ```bash
        cd frontend
        ```
        
    - Install the required Node.js packages:
    
        ```bash
        npm install
        ```
        
    - Start the React development server:
    
        ```bash
        npm start
        ```

5. Open your web browser and go to `http://localhost:3000/` to view the application.

## Project Structure

- `backend/`: Contains Django backend code.
- `frontend/`: Contains React frontend code.
- `venv/`: Python virtual environment directory (ignored in version control).
- `.gitignore`: Git ignore file to exclude certain files and directories from version control.
- `README.md`: This file, containing information about the project.

## Contributing

Contributions to this project are welcome. Please follow the standard GitHub workflow:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/foo`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/foo`).
6. Create a new Pull Request.