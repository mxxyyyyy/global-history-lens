import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Heart, Tag, Calendar, ArrowRight, BookOpen, Filter, X } from "lucide-react";
import {
  loadDialogueHistory,
  saveDialogueHistory,
  loadAllTags,
  saveAllTags,
  searchDialogues,
  toggleFavorite,
  removeTag,
  addTag,
  deleteDialogueRecord,
  formatTime,
  DialogueRecord,
} from "@/data/dialogueHistory";

export default function DialogueHistory() {
  const [records, setRecords] = useState<DialogueRecord[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<"all" | "perspective" | "persona">("all");
  const [selectedRecord, setSelectedRecord] = useState<DialogueRecord | null>(null);
  const [newTag, setNewTag] = useState("");
  const [showTagInput, setShowTagInput] = useState<string | null>(null);

  // 初始化加载数据
  useEffect(() => {
    const loadedRecords = loadDialogueHistory();
    setRecords(loadedRecords);
    
    const loadedTags = loadAllTags();
    setAllTags(loadedTags);
  }, []);

  // 搜索对话
  const filteredRecords = searchDialogues(
    records,
    searchKeyword,
    selectedTags,
    filterMode === "all" ? undefined : filterMode
  );

  // 处理收藏
  const handleToggleFavorite = (record: DialogueRecord) => {
    const updated = toggleFavorite(record);
    const newRecords = records.map(r => r.id === record.id ? updated : r);
    setRecords(newRecords);
    saveDialogueHistory(newRecords);
    if (selectedRecord?.id === record.id) {
      setSelectedRecord(updated);
    }
  };

  // 处理删除
  const handleDelete = (recordId: string) => {
    const newRecords = deleteDialogueRecord(records, recordId);
    setRecords(newRecords);
    saveDialogueHistory(newRecords);
    if (selectedRecord?.id === recordId) {
      setSelectedRecord(null);
    }
  };

  // 处理添加标签
  const handleAddTag = (record: DialogueRecord) => {
    if (!newTag.trim()) return;
    
    const updated = addTag(record, newTag);
    const newRecords = records.map(r => r.id === record.id ? updated : r);
    setRecords(newRecords);
    saveDialogueHistory(newRecords);
    
    const updatedTags = [...allTags, newTag];
    setAllTags(updatedTags);
    saveAllTags(updatedTags);
    
    if (selectedRecord?.id === record.id) {
      setSelectedRecord(updated);
    }
    
    setNewTag("");
    setShowTagInput(null);
  };

  // 处理移除标签
  const handleRemoveTag = (record: DialogueRecord, tag: string) => {
    const updated = removeTag(record, tag);
    const newRecords = records.map(r => r.id === record.id ? updated : r);
    setRecords(newRecords);
    saveDialogueHistory(newRecords);
    
    if (selectedRecord?.id === record.id) {
      setSelectedRecord(updated);
    }
  };

  // 切换标签筛选
  const toggleTagFilter = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      {/* Header */}
      <div className="border-b-2 border-border p-4 bg-secondary/30">
        <h1 className="font-mono text-xl font-bold uppercase flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5" />
          对话历史库
        </h1>
        <p className="text-xs text-muted-foreground font-typewriter mb-4">
          管理和回顾您的历史研究对话记录，支持标签分类和全文搜索
        </p>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索对话内容..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="pl-10 h-10 font-serif text-sm border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary bg-background shadow-brutal-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Mode Filter */}
          <div className="flex gap-1 border-r border-border pr-3">
            <Button
              size="sm"
              variant={filterMode === "all" ? "default" : "outline"}
              className="h-8 text-xs font-mono rounded-none border-2 border-border"
              onClick={() => setFilterMode("all")}
            >
              全部
            </Button>
            <Button
              size="sm"
              variant={filterMode === "perspective" ? "default" : "outline"}
              className="h-8 text-xs font-mono rounded-none border-2 border-border"
              onClick={() => setFilterMode("perspective")}
            >
              多视角
            </Button>
            <Button
              size="sm"
              variant={filterMode === "persona" ? "default" : "outline"}
              className="h-8 text-xs font-mono rounded-none border-2 border-border"
              onClick={() => setFilterMode("persona")}
            >
              人物对话
            </Button>
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTagFilter(tag)}
                  className={`text-xs px-2 py-1 border border-border font-mono transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground hover:bg-secondary"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Clear Filters */}
          {(searchKeyword || selectedTags.length > 0 || filterMode !== "all") && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs font-mono ml-auto"
              onClick={() => {
                setSearchKeyword("");
                setSelectedTags([]);
                setFilterMode("all");
              }}
            >
              <X className="w-3 h-3 mr-1" />
              清除筛选
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Records List */}
        <div className={`${selectedRecord ? "w-1/2" : "w-full"} border-r border-border transition-all`}>
          <ScrollArea className="h-full">
            {filteredRecords.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60 p-6">
                <Filter className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-serif font-bold mb-2">未找到对话记录</h3>
                <p className="text-sm text-muted-foreground font-typewriter">
                  {records.length === 0
                    ? "还没有保存任何对话。返回对话页面开始您的研究。"
                    : "调整搜索条件或标签筛选试试"}
                </p>
              </div>
            ) : (
              <div className="space-y-2 p-4">
                {filteredRecords.map((record, idx) => (
                  <motion.button
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedRecord(record)}
                    className={`w-full text-left p-3 border-2 transition-all ${
                      selectedRecord?.id === record.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50 hover:bg-secondary/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate text-foreground">
                          {record.title}
                        </h4>
                        <p className="text-xs text-muted-foreground font-typewriter mt-1">
                          {record.mode === "perspective" ? "📊 多视角分析" : "👤 人物对话"}
                          {" · "}
                          {record.messages.length} 条消息
                        </p>
                      </div>
                      {record.isFavorite && (
                        <Heart className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />
                      )}
                    </div>

                    {/* Tags */}
                    {record.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {record.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Summary & Time */}
                    <p className="text-xs text-muted-foreground font-serif line-clamp-2 mb-2">
                      {record.summary}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatTime(record.updatedAt)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Detail View */}
        {selectedRecord && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/2 border-l border-border flex flex-col bg-background"
          >
            {/* Detail Header */}
            <div className="border-b border-border p-4 bg-secondary/30">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-lg font-serif truncate">
                    {selectedRecord.title}
                  </h2>
                  <p className="text-xs text-muted-foreground font-typewriter mt-1">
                    {selectedRecord.mode === "perspective" ? "📊 多视角分析" : "👤 人物对话"}
                    {" · "}
                    {selectedRecord.messages.length} 条消息
                    {" · "}
                    {formatTime(selectedRecord.updatedAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tags Section */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {selectedRecord.tags.map(tag => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 text-xs font-mono rounded-sm"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(selectedRecord, tag)}
                        className="hover:opacity-70 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Tag */}
                {showTagInput === selectedRecord.id ? (
                  <div className="flex gap-1">
                    <Input
                      placeholder="输入新标签..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddTag(selectedRecord);
                        }
                      }}
                      className="h-8 text-xs border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddTag(selectedRecord)}
                      className="h-8 px-2 text-xs font-mono rounded-none bg-primary text-primary-foreground"
                    >
                      添加
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs font-mono rounded-none border-2 border-border w-full"
                    onClick={() => setShowTagInput(selectedRecord.id)}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    添加标签
                  </Button>
                )}
              </div>
            </div>

            {/* Detail Content */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {selectedRecord.messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.type === "user" ? (
                      <div className="bg-primary text-primary-foreground p-2 max-w-[85%] shadow-brutal-sm font-serif text-xs md:text-sm rounded-sm">
                        {typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content)}
                      </div>
                    ) : (
                      <div className="bg-card border border-border p-2 max-w-[85%] text-xs md:text-sm">
                        {typeof msg.content === "string" ? (
                          <p className="font-serif">{msg.content}</p>
                        ) : (
                          <div className="font-typewriter text-muted-foreground">
                            <p className="font-bold mb-1">
                              {msg.content.china?.title || msg.content.character || "系统回复"}
                            </p>
                            <p className="text-xs">
                              {msg.content.china?.content || msg.content.content || ""}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Detail Footer */}
            <div className="border-t border-border p-4 bg-secondary/30 flex gap-2">
              <Button
                size="sm"
                variant={selectedRecord.isFavorite ? "default" : "outline"}
                className="flex-1 h-9 text-xs font-mono rounded-none border-2 border-border"
                onClick={() => handleToggleFavorite(selectedRecord)}
              >
                <Heart className={`w-4 h-4 mr-1 ${selectedRecord.isFavorite ? "fill-current" : ""}`} />
                {selectedRecord.isFavorite ? "已收藏" : "收藏"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-9 text-xs font-mono rounded-none border-2 border-destructive text-destructive hover:bg-destructive/10"
                onClick={() => handleDelete(selectedRecord.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                删除
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
