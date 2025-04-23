<template>
  <div class="comment-section">
    <el-collapse>
      <el-collapse-item title="发表评论" name="comment" class="comment-title">
        <!-- 评论输入框 -->
        <div class="comment-input">
          <input
              v-model="author"
              type="text"
              placeholder="请输入您的昵称"
              class="input-field"
          />
          <textarea
              v-model="content"
              placeholder="请输入评论内容"
              class="input-field"
          ></textarea>
          <button @click="submitComment" class="submit-button">发表评论</button>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 评论列表 -->
    <div class="comment-list">
      <div v-for="comment in commentStore.comments" :key="comment.id" class="comment-item">
        <div class="comment-header-wrapper">
          <el-avatar :size="50" :src="circleUrl" class="comment-avatar"></el-avatar>
          <div class="comment-header-info">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="comment-content">{{ comment.content }}</p>
          </div>
        </div>
        <button @click="deleteComment(comment.id)" class="delete-button">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCommentStore } from '@/stores/modules/commentStore';

// 获取评论存储实例
const commentStore = useCommentStore();
// 评论者昵称
const author = ref('');
// 评论内容
const content = ref('');

// 头像地址，这里先使用一个默认值，你可以根据实际情况修改
const circleUrl = ref('https://via.placeholder.com/50');

// 格式化日期的函数
const formatDate = (date: Date) => {
  return date.toLocaleString();
};

// 提交评论的方法
const submitComment = () => {
  if (author.value.trim()!== '' && content.value.trim()!== '') {
    commentStore.addComment(author.value, content.value);
    author.value = '';
    content.value = '';
  }
};

// 删除评论的方法
const deleteComment = (id: number) => {
  commentStore.deleteComment(id);
};
</script>

<style scoped>
/* 评论区整体样式 */
.comment-section {
  width: 90%;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

/* 评论区标题样式 */
.comment-title {
  padding: 0;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

/* 评论输入框样式 */
.comment-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.input-field {
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #ff0000;
  box-shadow: 0 0 5px rgba(62, 1, 2, 0.5);
}

.submit-button {
  padding: 12px 20px;
  background-color: #b80412;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.submit-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

/* 评论列表样式 */
.comment-list {
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

.comment-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 0;
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
}

.comment-item:hover {
  background-color: #f0f0f0;
}

.comment-header-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.comment-avatar {
  margin-right: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-header-info {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.comment-author {
  font-weight: bold;
  color: #333;
  font-size: 18px;
}

.comment-date {
  color: #999;
  font-size: 14px;
}

.comment-content {
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;
  color: #555;
}

.delete-button {
  align-self: flex-end;
  padding: 8px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.delete-button:hover {
  background-color: #c82333;
  transform: scale(1.05);
}
</style>
