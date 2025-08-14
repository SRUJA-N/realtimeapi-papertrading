# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# --- Environment Variables ---
# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# --- Install Dependencies ---
# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir --upgrade pip -r requirements.txt

# --- Copy Application Code ---
# Copy the rest of the backend source code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# --- Run the Application ---
# Command to run the Uvicorn server
# Binds the server to 0.0.0.0 to be accessible from outside the container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]