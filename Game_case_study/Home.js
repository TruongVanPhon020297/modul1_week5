// Khởi tạo canvas để vẽ
var canvas = document.getElementById("my_canvas");
var context = canvas.getContext("2d");
// Khởi tạo đối tượng quả bóng
var ball = {
    x_ball : 20, // Tọa độ x để vẽ quả bóng
    y_ball : 20, // Tọa độ y để vẽ quả bóng
    radius_ball : 20, // Bán kính để vẽ quả bóng
    dx_ball : 5, // Giá trị của tọa độ x tăng lên sau mỗi lần vẽ
    dy_ball : 2, // Giá trị của tọa độ y tăng lên sau mỗi lần vẽ
}
// Tạo hàm để vẽ quả bóng 
function draw_ball(){
    context.beginPath();
    context.arc(ball.x_ball,ball.y_ball,ball.radius_ball,0,Math.PI*2);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}
// Tạo hàm thay đổi tọa độ của quả bóng sau mỗi lần vẽ
function update_position_ball(){
    ball.x_ball += ball.dx_ball;
    ball.y_ball += ball.dy_ball;
}
// Tạo hàm để kiểm tra quả bóng va chạm với các biên xung quanh và thay đổi cách di chuyển của quả bóng
function ball_collision(){
    if(ball.x_ball < ball.radius_ball || ball.x_ball > canvas.width - ball.radius_ball){
        ball.dx_ball = - ball.dx_ball;
    }else if(ball.y_ball < ball.radius_ball){
        ball.dy_ball = - ball.dy_ball;
    }
}
// Tạo hàm để xóa các phần tử sau mỗi lần vẽ
function clear_canvas(){
    context.clearRect(0,0,canvas.width,canvas.height);
}
// Khởi tạo đối tượng thanh chắn
var bars = {
    height_bars : 10, // Chiều cao của thanh chắn
    width_bars : 100, // Chiều rộng của thanh chắn
    x_bars : 0, // Tọa độ x của thanh chắn khi vẽ
    y_bars : canvas.height - 10, // Tọa độ y của thanh chắn khi vẽ
    speed_bars : 10, // Tốc độ di chuyển của thanh chắn
    is_left : false, // Kiểm tra thanh chắn sang trái
    is_right : false, // Kiểm tra thanh chắn sang phải
}
// Tạo hàm vẽ thanh chắn
function draw_bars(){
    context.beginPath();
    context.rect(bars.x_bars,bars.y_bars,bars.width_bars,bars.height_bars);
    context.fill();
    context.closePath();
}
// Tạo sự kiện để kiểm tra người dùng nhấn phím
// Kiểm tra người dùng nhấn phím
document.addEventListener("keydown",function(event){
    if(event.keyCode == 37){
        bars.is_left = true;
    }else if(event.keyCode == 39){
        bars.is_right = true;
    }
});
// Kiểm tra người dùng nhã phím
document.addEventListener("keyup",function(event){
    if(event.keyCode == 37){
        bars.is_left = false;
    }else if(event.keyCode == 39){
        bars.is_right = false;
    }
});
// Tạo hàm để di chuyển thanh chắn
function bars_motion(){
    if(bars.is_left){
        bars.x_bars -= bars.speed_bars;
    }else if(bars.is_right){
        bars.x_bars += bars.speed_bars;
    }
}
// Tạo hàm để kiểm tra thanh chắn va chạm hai bên biên
function bars_collision(){
    if(bars.x_bars < 0){
        bars.x_bars = 0;
    }else if(bars.x_bars > canvas.width - bars.width_bars){
        bars.x_bars = canvas.width - bars.width_bars;
    }
}
// Tạo biến để kiểm tra kết thúc game
var is_game_over = false;
// Tạo hàm khi game kết thúc
function game_over(){
    alert("Game Over");
}
// Tạo hàm để kiểm tra va chạm giữa quả bóng với thanh chắn
function ball_collision_bars(){
    if(ball.x_ball + ball.radius_ball >= bars.x_bars
        && ball.x_ball + ball.radius_ball <= bars.x_bars + bars.width_bars
        && ball.y_ball + ball.radius_ball >= canvas.height - bars.height_bars){
        ball.dy_ball = -ball.dy_ball;
    }
}
// Tạo hàm để vẽ chuyển động
function draw_motion(){
    if(!is_game_over){
        clear_canvas();
        draw_ball();
        update_position_ball();
        ball_collision();
        draw_bars();
        bars_motion();
        bars_collision();
        ball_collision_bars();
        // Trò chơi kết thúc khi bóng chạm biên dưới cùng
        if(ball.y_ball > canvas.height - ball.radius_ball){
            is_game_over = true;
        }
        requestAnimationFrame(draw_motion);
    }else {
        game_over();
    }
}
draw_motion();