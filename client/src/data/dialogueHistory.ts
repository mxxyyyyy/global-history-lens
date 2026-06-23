// 对话历史管理系统

export interface DialogueMessage {
  id: string;
  type: 'user' | 'bot';
  content: any;
  mode: 'perspective' | 'persona';
  timestamp: number;
  persona?: any;
}

export interface DialogueRecord {
  id: string;
  title: string;
  messages: DialogueMessage[];
  tags: string[];
  isFavorite: boolean;
  createdAt: number;
  updatedAt: number;
  mode: 'perspective' | 'persona';
  summary?: string;
}

export interface DialogueHistoryState {
  records: DialogueRecord[];
  favorites: string[]; // IDs of favorite records
  allTags: string[];
}

// LocalStorage 键名
const STORAGE_KEY = 'global_history_lens_dialogues';
const TAGS_KEY = 'global_history_lens_tags';

// 生成唯一ID
export const generateId = (): string => {
  return `dialogue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 从LocalStorage读取对话历史
export const loadDialogueHistory = (): DialogueRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load dialogue history:', error);
    return [];
  }
};

// 保存对话历史到LocalStorage
export const saveDialogueHistory = (records: DialogueRecord[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to save dialogue history:', error);
  }
};

// 加载所有标签
export const loadAllTags = (): string[] => {
  try {
    const data = localStorage.getItem(TAGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load tags:', error);
    return [];
  }
};

// 保存标签
export const saveAllTags = (tags: string[]): void => {
  try {
    const uniqueTags = Array.from(new Set(tags));
    localStorage.setItem(TAGS_KEY, JSON.stringify(uniqueTags));
  } catch (error) {
    console.error('Failed to save tags:', error);
  }
};

// 创建新的对话记录
export const createDialogueRecord = (
  messages: DialogueMessage[],
  mode: 'perspective' | 'persona',
  title?: string
): DialogueRecord => {
  const firstUserMessage = messages.find(m => m.type === 'user');
  const defaultTitle = firstUserMessage?.content || '新对话';
  
  return {
    id: generateId(),
    title: title || defaultTitle,
    messages,
    tags: [],
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    mode,
    summary: generateSummary(messages),
  };
};

// 生成对话摘要
const generateSummary = (messages: DialogueMessage[]): string => {
  const userMessages = messages.filter(m => m.type === 'user');
  if (userMessages.length === 0) return '空对话';
  
  const firstQuestion = userMessages[0].content;
  return typeof firstQuestion === 'string' 
    ? firstQuestion.substring(0, 100) 
    : '多视角对话';
};

// 搜索对话
export const searchDialogues = (
  records: DialogueRecord[],
  keyword: string,
  tags: string[] = [],
  mode?: 'perspective' | 'persona'
): DialogueRecord[] => {
  let filtered = records;

  // 按关键词搜索
  if (keyword.trim()) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = filtered.filter(record => {
      const titleMatch = record.title.toLowerCase().includes(lowerKeyword);
      const summaryMatch = record.summary?.toLowerCase().includes(lowerKeyword);
      const messageMatch = record.messages.some(msg => {
        const content = typeof msg.content === 'string' 
          ? msg.content 
          : JSON.stringify(msg.content);
        return content.toLowerCase().includes(lowerKeyword);
      });
      return titleMatch || summaryMatch || messageMatch;
    });
  }

  // 按标签筛选
  if (tags.length > 0) {
    filtered = filtered.filter(record =>
      tags.some(tag => record.tags.includes(tag))
    );
  }

  // 按模式筛选
  if (mode) {
    filtered = filtered.filter(record => record.mode === mode);
  }

  // 按最新时间排序
  return filtered.sort((a, b) => b.updatedAt - a.updatedAt);
};

// 更新对话记录
export const updateDialogueRecord = (
  record: DialogueRecord,
  updates: Partial<DialogueRecord>
): DialogueRecord => {
  return {
    ...record,
    ...updates,
    updatedAt: Date.now(),
  };
};

// 删除对话记录
export const deleteDialogueRecord = (
  records: DialogueRecord[],
  recordId: string
): DialogueRecord[] => {
  return records.filter(r => r.id !== recordId);
};

// 切换收藏状态
export const toggleFavorite = (
  record: DialogueRecord
): DialogueRecord => {
  return {
    ...record,
    isFavorite: !record.isFavorite,
    updatedAt: Date.now(),
  };
};

// 添加标签
export const addTag = (
  record: DialogueRecord,
  tag: string
): DialogueRecord => {
  if (record.tags.includes(tag)) return record;
  return {
    ...record,
    tags: [...record.tags, tag],
    updatedAt: Date.now(),
  };
};

// 移除标签
export const removeTag = (
  record: DialogueRecord,
  tag: string
): DialogueRecord => {
  return {
    ...record,
    tags: record.tags.filter(t => t !== tag),
    updatedAt: Date.now(),
  };
};

// 格式化时间
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  
  return date.toLocaleDateString('zh-CN');
};
