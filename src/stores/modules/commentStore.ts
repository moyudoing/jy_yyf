// src/stores/commentStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

// 定义评论类型
interface Comment {
    id: number;
    author: string;
    content: string;
    createdAt: Date;
}

// 初始化评论数据
const initialComments: Comment[] = [
    {
        id: 1,
        author: 'Alice',
        content: '这是一条测试评论。',
        createdAt: new Date(),
    },
];

export const useCommentStore = defineStore('comment', () => {
    // 评论列表，初始化为包含初始化评论数据
    const comments = ref<Comment[]>(initialComments);
    // 评论 ID 计数器，初始值为初始化评论数据中的最大 ID 加 1
    let nextId = ref(Math.max(...comments.value.map(comment => comment.id), 0) + 1);

    // 添加评论的方法
    const addComment = (author: string, content: string): void => {
        if (!author.trim() ||!content.trim()) {
            console.error('评论的作者和内容不能为空');
            return;
        }
        const newComment: Comment = {
            id: nextId.value++,
            author,
            content,
            createdAt: new Date()
        };
        comments.value.push(newComment);
    };

    // 删除评论的方法
    const deleteComment = (id: number): void => {
        const commentIndex = comments.value.findIndex(comment => comment.id === id);
        if (commentIndex === -1) {
            console.error(`未找到 ID 为 ${id} 的评论，无法删除。`);
            return;
        }
        comments.value.splice(commentIndex, 1);
    };

    // 更新评论的方法
    const updateComment = (id: number, newContent: string): void => {
        const commentIndex = comments.value.findIndex(comment => comment.id === id);
        if (commentIndex === -1) {
            console.error(`未找到 ID 为 ${id} 的评论，无法更新。`);
            return;
        }
        if (!newContent.trim()) {
            console.error('更新的评论内容不能为空');
            return;
        }
        comments.value[commentIndex].content = newContent;
        comments.value[commentIndex].createdAt = new Date();
    };

    // 根据作者获取评论列表的方法
    const getCommentsByAuthor = (author: string): Comment[] => {
        return comments.value.filter(comment => comment.author === author);
    };

    // 根据 ID 获取单个评论的方法
    const getCommentById = (id: number): Comment | undefined => {
        return comments.value.find(comment => comment.id === id);
    };

    // 获取所有评论的方法
    const getAllComments = (): Comment[] => {
        return comments.value;
    };

    return {
        comments,
        addComment,
        deleteComment,
        updateComment,
        getCommentsByAuthor,
        getCommentById,
        getAllComments
    };
});
