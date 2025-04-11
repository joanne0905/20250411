let circles = [];
let stars = [];

function setup() {
  // 視窗大小全螢幕
  createCanvas(windowWidth, windowHeight);

  // 產生 40 個圓
  for (let i = 0; i < 40; i++) {
    let circle = {
      x: random(width),
      y: random(height),
      size: random(30, 100),
      color: color(random(255), random(255), random(255))
    };
    circles.push(circle);
  }

  // 初始化 50 顆星星
  for (let i = 0; i < 50; i++) {
    let star = {
      x: random(width),
      y: random(-height, 0), // 星星從畫布上方開始
      size: random(20, 50),
      speed: random(1, 5) // 星星下落速度
    };
    stars.push(star);
  }
}

function draw() {
  // 清除畫布並重新設定背景為漸層
  setGradient(0, 0, width, height, color('#0d1b2a'), color('#1b263b'), color('#415a77'));

  // 繪製每個圓
  for (let circle of circles) {
    // 計算圓的大小隨滑鼠左右移動變化
    let newSize = map(mouseX, 0, width, 10, 120);
    circle.size = constrain(newSize, 10, 120);

    // 設定顏色並繪製圓
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size);
  }

  // 更新並繪製每顆星星
  for (let star of stars) {
    // 繪製星星
    fill(255, 255, 0); // 黃色
    noStroke();
    ellipse(star.x, star.y, star.size);

    // 更新星星位置
    star.y += star.speed;

    // 更新星星大小（讓大小在 20 到 50 間變化）
    star.size = map(sin(frameCount * 0.05 + star.x), -1, 1, 5, 8);

    // 如果星星超出畫布底部，重置到畫布上方
    if (star.y > height) {
      star.y = random(-50, 0);
      star.x = random(width);
      star.speed = random(1, 5);
    }
  }
}

// 自訂函式：繪製漸層背景
function setGradient(x, y, w, h, c1, c2, c3) {
  for (let i = y; i < y + h; i++) {
    let inter1 = map(i, y, y + h / 2, 0, 1);
    let inter2 = map(i, y + h / 2, y + h, 0, 1);
    let c = i < y + h / 2 ? lerpColor(c1, c2, inter1) : lerpColor(c2, c3, inter2);
    stroke(c);
    line(x, i, x + w, i);
  }
}
