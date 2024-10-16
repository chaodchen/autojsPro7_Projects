let a = textContains('阅读安全手册').findOnce()
let b = a.parent().parent().parent().child(1)
click(b.bounds().centerX(), b.bounds().centerY())

