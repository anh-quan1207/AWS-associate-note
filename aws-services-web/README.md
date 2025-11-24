# AWS Services Web App

Ứng dụng web hiển thị các dịch vụ AWS được tổ chức theo danh mục, hỗ trợ việc học và ôn thi chứng chỉ AWS Associate.

## Tính năng

- **Menu điều hướng cấp 2**: Top navigation với dropdown menu cho từng danh mục
- **Hiển thị theo danh mục**: Mỗi danh mục hiển thị tất cả dịch vụ AWS dưới dạng bảng
- **Tìm kiếm và sắp xếp**: Tìm kiếm dịch vụ và sắp xếp theo các cột
- **Responsive design**: Tối ưu cho mobile, tablet và desktop
- **Giao diện hiện đại**: Design clean, dễ đọc với màu sắc phù hợp AWS branding

## Cấu trúc danh mục

- **Tổng quan**: IaaS, PaaS, SaaS, AWS Well-Architected Framework
- **Lưu trữ**: S3 (các classes), EBS, EFS, FSx
- **Compute**: EC2, Lambda, Elastic Beanstalk
- **Container**: ECS, EKS, Fargate
- **Xử lý hàng loạt**: AWS Batch
- **Cơ sở dữ liệu**: RDS, Aurora, DynamoDB, ElastiCache, DocumentDB, Neptune, Keyspaces, QLDB, Redshift, EMR, QuickSight, Glue, Athena, Lake Formation
- **Networking**: Route 53 (các routing policies)
- **Bảo mật**: KMS
- **Triển khai**: Elastic Beanstalk

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

## Cấu trúc project

```
aws-services-web/
├── src/
│   ├── components/
│   │   ├── NavBar.vue          # Navigation component
│   │   └── ServiceTable.vue     # Table hiển thị dịch vụ
│   ├── views/
│   │   ├── Home.vue             # Trang chủ
│   │   └── ServiceCategory.vue # Trang danh mục
│   ├── data/
│   │   └── services.json        # Dữ liệu dịch vụ AWS
│   ├── router/
│   │   └── index.js             # Vue Router config
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── package.json
└── README.md
```

## Sử dụng

1. Truy cập trang chủ để xem tất cả danh mục
2. Click vào danh mục hoặc sử dụng menu để xem các dịch vụ
3. Sử dụng thanh tìm kiếm để lọc dịch vụ
4. Click vào header cột để sắp xếp

## Công nghệ sử dụng

- Vue 3
- Vue Router 4
- Vite
- JavaScript (ES6+)

## License

MIT
