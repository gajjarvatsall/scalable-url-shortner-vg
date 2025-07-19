provider "aws" {
  region = "ap-south-1"
}

resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = file("~/.ssh/id_rsa.pub")  
}

resource "aws_security_group" "url_shortener_sg" {
  name        = "url-shortener-sg"
  description = "Allow traffic on ports 22, 2004, 6379, 27017"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "App Port"
    from_port   = 2004
    to_port     = 2004
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "MongoDB"
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Or your IP for tighter security
  }

  ingress {
    description = "Redis"
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "url_shortener" {
  ami           = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 (adjust to latest if needed)
  instance_type = "t2.micro"
  key_name      = aws_key_pair.deployer.key_name
  security_groups = [aws_security_group.url_shortener_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              service docker start
              usermod -a -G docker ec2-user
              curl -sL https://rpm.nodesource.com/setup_18.x | bash -
              yum install -y nodejs git

              # Clone the repo (assuming public GitHub)
              git clone https://github.com/YOUR_USERNAME/scalable_url_shortener.git /home/ec2-user/app
              cd /home/ec2-user/app

              # Create .env file
              cat <<EOT >> .env
              PORT=2004
              MONGO_URI=mongodb://localhost:27017/urlShortener
              JWT_SECRET=supersecretkey
              REDIS_URL=redis://localhost:6379
              BASE_URL=http://localhost:2004
              EOT

              docker-compose up --build -d
              EOF

  tags = {
    Name = "URLShortenerInstance"
  }
}
