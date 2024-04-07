1. @Controller() decorator:
 - NestJS sử dụng rất nhiều decorators(Trình trang trí).
 - Để đánh dấu 1 class là 1 controller.
 - @Controller() decorator: Chúng ta sẽ truyền 1 optional argument cho nó.
   + Ví dụ: @Controller('posts')
 - Và nó hoạt động như 1 path prefix sẽ dẫn tới các routes trong controller đấy.

2. Data Transfer Object (DTO): DTO sẽ xác định kiểu dữ liệu được gửi trong 1 request.
 + DTO có thể là 1 interface hoặc 1 class

3. Ưu điểm của NestJS so với Express:
 - NestJS cung cấp rất nhiều thứ vượt trội hơn trong việc thiết kế API và sử dụng các controller.
 - Ngược lại Express.js sẽ giúp chúng ta linh hoạt hơn không việc thiết kế API nhưng sẽ không trạng bị cho chúng ta những
 công cụ như NestJS để tăng khả năng readability of our code.
 - Ưu điểm khác của NestJS là cung cấp các provides để xử lí các đối tượng Request và Response 1 cách linh hoạt như là:
 @Body() và @Params() sẽ giúp bạn improve trong việc readability of our code.
 
 4. @Injectable() decorator sẽ cho NestJs biết rằng 1 class là 1 provider. và chúng ta có thể thêm nó vào module.

 5. Module:
 - Chúng ta sử dụng modules để tổ chức các ứng dụng của mình.
 - Ví dụ PostControler và PostService chúng có closely related. Vì vậy chúng nên đặt trong cùng 1 module.