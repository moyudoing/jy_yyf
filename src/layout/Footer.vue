<script setup lang="ts">

</script>

<template>
  <footer id="footer" class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <img alt="菊芋营养粉" class="footer-logo" src="@/assets/favicon.ico">
          <p>专注于健康食品研发</p>
        </div>
        <div class="footer-links">
          <h4>快速链接</h4>
          <ul>
            <li><a href="#home">首页</a></li>
            <li><a href="#products">产品</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>联系我们</h4>
          <p>电话：XXX-XXXX-XXXX</p>
          <p>邮箱：contact@example.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 菊芋营养粉. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Footer */
.footer {
  background: var(--background-alt);
  padding: var(--spacing-3xl) 0 var(--spacing-xl);
  margin-top: var(--spacing-3xl);
  min-height: var(--footer-height);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
}

.footer-info {
  max-width: 400px;
}

.footer-logo {
  height: calc(var(--icon-xl) * 1.5);
  margin-bottom: var(--spacing-md);
}

.footer-links h4,
.footer-contact h4 {
  margin-bottom: var(--spacing-lg);
  color: var(--text-color);
}

.footer-links ul {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-links a {
  color: var(--text-color-light);
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--text-color-light);
}

.footer-contact p {
  color: var(--text-color-light);
  margin-bottom: var(--spacing-sm);
}

.footer-bottom {
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--background-color);
  text-align: center;
  color: var(--text-color-light);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .footer-info {
    max-width: 100%;
    text-align: center;
  }
}
</style>
