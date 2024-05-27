# Sử dụng một hình ảnh cơ sở chứa Node.js
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói phụ thuộc
RUN npm install

# Sao chép mã nguồn ứng dụng vào thư mục làm việc
COPY . .

# Mở cổng cho ứng dụng
EXPOSE 8000

# Khởi động ứng dụng
CMD ["npm", "start"]