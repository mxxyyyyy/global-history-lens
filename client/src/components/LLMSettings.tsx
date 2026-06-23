import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Zap, ZapOff } from "lucide-react";
import { motion } from "framer-motion";
import {
  loadLLMConfig,
  saveLLMConfig,
  clearLLMConfig,
  DEFAULT_CONFIGS,
  type LLMConfig,
} from "@/lib/llm";

interface LLMSettingsProps {
  onConfigChange?: (config: LLMConfig | null) => void;
}

export default function LLMSettings({ onConfigChange }: LLMSettingsProps) {
  const [config, setConfig] = useState<LLMConfig | null>(null);
  const [open, setOpen] = useState(false);

  // form state
  const [preset, setPreset] = useState("deepseek");
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState(DEFAULT_CONFIGS[0].baseUrl);
  const [model, setModel] = useState(DEFAULT_CONFIGS[0].model);

  useEffect(() => {
    const saved = loadLLMConfig();
    setConfig(saved);
    onConfigChange?.(saved);
  }, []);

  const handleOpen = () => {
    // pre-fill form from current config
    if (config) {
      setApiKey(config.apiKey);
      setBaseUrl(config.baseUrl);
      setModel(config.model);
      // detect preset
      const matched = DEFAULT_CONFIGS.findIndex(
        (c) => c.baseUrl === config.baseUrl && c.model === config.model
      );
      if (matched === 0) setPreset("deepseek");
      else if (matched === 1) setPreset("openai");
      else if (matched === 2) setPreset("tongyi");
      else setPreset("custom");
    } else {
      setApiKey("");
      setPreset("deepseek");
      setBaseUrl(DEFAULT_CONFIGS[0].baseUrl);
      setModel(DEFAULT_CONFIGS[0].model);
    }
    setOpen(true);
  };

  const handlePresetChange = (value: string) => {
    setPreset(value);
    if (value === "deepseek") {
      setBaseUrl(DEFAULT_CONFIGS[0].baseUrl);
      setModel(DEFAULT_CONFIGS[0].model);
    } else if (value === "openai") {
      setBaseUrl(DEFAULT_CONFIGS[1].baseUrl);
      setModel(DEFAULT_CONFIGS[1].model);
    } else if (value === "tongyi") {
      setBaseUrl(DEFAULT_CONFIGS[2].baseUrl);
      setModel(DEFAULT_CONFIGS[2].model);
    }
    // custom: keep current baseUrl/model for user to edit
  };

  const handleSave = () => {
    if (!apiKey.trim()) return;
    const newConfig: LLMConfig = {
      apiKey: apiKey.trim(),
      baseUrl: baseUrl.trim(),
      model: model.trim(),
    };
    saveLLMConfig(newConfig);
    setConfig(newConfig);
    onConfigChange?.(newConfig);
    setOpen(false);
  };

  const handleDisconnect = () => {
    clearLLMConfig();
    setConfig(null);
    onConfigChange?.(null);
    setOpen(false);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpen}
          className={
            config
              ? "border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
              : "border-muted-foreground/30"
          }
        >
          {config ? (
            <>
              <Zap className="w-4 h-4 mr-1" /> AI已连接
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 mr-1" /> 配置AI
            </>
          )}
        </Button>
      </motion.div>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 bg-background border-2 border-border shadow-brutal p-6 w-full max-w-md mx-4 rounded-lg"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" /> AI 模型配置
            </h3>

            <div className="space-y-4">
              {/* Preset selector - native select */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  预设服务商
                </label>
                <select
                  value={preset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="deepseek">DeepSeek（推荐）</option>
                  <option value="openai">OpenAI</option>
                  <option value="tongyi">通义千问</option>
                  <option value="custom">自定义</option>
                </select>
              </div>

              {/* API Key */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  API Key
                </label>
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>

              {/* Custom fields */}
              {preset === "custom" && (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Base URL
                    </label>
                    <Input
                      placeholder="https://api.example.com"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      模型名称
                    </label>
                    <Input
                      placeholder="model-name"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} disabled={!apiKey.trim()} className="flex-1">
                  保存
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
                  取消
                </Button>
              </div>

              {config && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={handleDisconnect}
                >
                  <ZapOff className="w-4 h-4 mr-1" /> 断开连接
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
