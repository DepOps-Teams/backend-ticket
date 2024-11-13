# Gunakan image Node sebagai base
FROM node:16

# Setel direktori kerja di dalam container
WORKDIR /backend

# Salin file package.json dan package-lock.json untuk instalasi dependencies
COPY package.json /backend/

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . /backend/

# Build aplikasi untuk produksi
RUN npm run build

# Install http-server secara global untuk menyajikan build
RUN npm install -g http-server

# Atur command untuk menjalankan server di folder build
CMD ["http-server", "build", "-c-1"]
