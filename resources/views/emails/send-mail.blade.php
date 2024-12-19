<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yêu Cầu Liên Hệ Mới</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: linear-gradient(135deg, #ece9e6, #ffffff);
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }

        h1 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #34495e;
            text-align: center;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }

        p {
            margin: 10px 0;
            font-size: 16px;
        }

        .field {
            font-weight: bold;
            color: #2980b9;
        }

        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #7f8c8d;
            text-align: center;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }

        .container:hover {
            transform: scale(1.02);
            transition: transform 0.3s ease-in-out;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Thông Tin Yêu Cầu Liên Hệ Mới</h1>
        <p><span class="field">Họ và Tên:</span> {{ $data['name'] }}</p>
        <p><span class="field">Email:</span> {{ $data['email'] }}</p>
        <p><span class="field">Số Điện Thoại:</span> {{ $data['phone'] }}</p>
        @if (!is_null($data['message']))
        <p><span class="field">Tin Nhắn:</span> {{ $data['message'] }}</p>
        @endif
        <p><span class="field">Ngày Gửi:</span> {{ \Carbon\Carbon::parse($data['created_at'])->format('d/m/Y H:i') }}
        </p>
        <div class="footer">
            Đây là email thông báo từ hệ thống. Vui lòng không trả lời email này.
        </div>
    </div>
</body>

</html>
