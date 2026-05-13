"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Trash2,
  Star,
  GripVertical,
  Loader2,
  ImageIcon,
  Film,
  Monitor,
  Smartphone,
  Sparkles,
  Eye,
  EyeOff,
  Check,
  X,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

const MEDIA_TYPES = [
  { key: "hero", label: "Hero Banner", icon: Monitor, aspect: "21:9", desc: "Full-width cinematic banner for detail page" },
  { key: "thumbnail", label: "Card Thumbnail", icon: ImageIcon, aspect: "16:10", desc: "Grid card image — first impression" },
  { key: "gallery", label: "Gallery", icon: ImageIcon, aspect: "16:9", desc: "Detail page carousel gallery" },
  { key: "showcase", label: "Featured Showcase", icon: Sparkles, aspect: "16:9", desc: "Featured Spotlight section render" },
  { key: "mobile", label: "Mobile Optimized", icon: Smartphone, aspect: "9:16", desc: "Portrait images for mobile devices" },
  { key: "video", label: "Video Preview", icon: Film, aspect: "16:9", desc: "Short cinematic video clips" },
] as const;

type MediaType = (typeof MEDIA_TYPES)[number]["key"];

interface MediaItem {
  id: string;
  type: string;
  url: string;
  publicId: string;
  width: number | null;
  height: number | null;
  format: string | null;
  alt: string;
  caption: string;
  sortOrder: number;
  isPrimary: boolean;
  published: boolean;
}

export default function CarMediaPage() {
  const { id: carId } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeType, setActiveType] = useState<MediaType>("thumbnail");
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewFiles, setPreviewFiles] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch car details
  const { data: car } = useQuery({
    queryKey: ["car-admin", carId],
    queryFn: async () => {
      const res = await fetch(`/api/cars/${carId}`);
      return res.json();
    },
  });

  // Fetch media for this car
  const { data: mediaData, isLoading: mediaLoading } = useQuery({
    queryKey: ["car-media", carId],
    queryFn: async () => {
      const res = await fetch(`/api/media/${carId}`);
      return res.json();
    },
  });

  const activeMedia: MediaItem[] = mediaData?.grouped?.[activeType] || [];

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      setUploading(true);
      const results = [];
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("carId", carId);
        formData.append("type", activeType);
        formData.append("isPrimary", String(activeMedia.length === 0 && i === 0));

        const res = await fetch("/api/media/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Upload failed");
        }
        results.push(await res.json());
      }
      return results;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["car-media", carId] });
      queryClient.invalidateQueries({ queryKey: ["car-admin", carId] });
      toast.success(`${data.length} file(s) uploaded successfully`);
      setPreviewFiles([]);
      setUploading(false);
      setUploadProgress(0);
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setUploading(false);
      setUploadProgress(0);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (mediaIds: string[]) => {
      const res = await fetch(`/api/media/${carId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaIds }),
      });
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["car-media", carId] });
      toast.success("Media deleted");
    },
  });

  // Update mutation (reorder, set primary, toggle publish)
  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<MediaItem>[]) => {
      const res = await fetch(`/api/media/${carId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["car-media", carId] });
      queryClient.invalidateQueries({ queryKey: ["car-admin", carId] });
    },
  });

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleFiles = useCallback((files: File[]) => {
    const validFiles = files.filter((f) => {
      if (activeType === "video") return f.type.startsWith("video/");
      return f.type.startsWith("image/");
    });
    const previews = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPreviewFiles((prev) => [...prev, ...previews]);
  }, [activeType]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    },
    [handleFiles]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
  };

  const confirmUpload = () => {
    if (previewFiles.length === 0) return;
    uploadMutation.mutate(previewFiles.map((p) => p.file));
  };

  const cancelPreview = () => {
    previewFiles.forEach((p) => URL.revokeObjectURL(p.preview));
    setPreviewFiles([]);
  };

  const setPrimary = (mediaId: string) => {
    // Unset all others, set this one
    const updates = activeMedia.map((m) => ({
      id: m.id,
      isPrimary: m.id === mediaId,
    }));
    updateMutation.mutate(updates);
    toast.success("Primary image updated");
  };

  const togglePublish = (mediaId: string, currentState: boolean) => {
    updateMutation.mutate([{ id: mediaId, published: !currentState }]);
  };

  const handleReorder = (newOrder: MediaItem[]) => {
    const updates = newOrder.map((item, index) => ({
      id: item.id,
      sortOrder: index,
    }));
    updateMutation.mutate(updates);
  };

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => previewFiles.forEach((p) => URL.revokeObjectURL(p.preview));
  }, [previewFiles]);

  const activeTypeConfig = MEDIA_TYPES.find((t) => t.key === activeType)!;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push("/admin/cars")}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">
                Media Manager
              </p>
              <h1 className="text-2xl font-bold tracking-tight">
                {car?.name || "Loading..."}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/40">
              {mediaData?.media?.length || 0} assets
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 pt-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar — Media Type Tabs */}
          <div className="col-span-3">
            <div className="sticky top-32 space-y-2">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-4 px-4">
                Asset Categories
              </p>
              {MEDIA_TYPES.map((type) => {
                const count = mediaData?.grouped?.[type.key]?.length || 0;
                const Icon = type.icon;
                return (
                  <button
                    key={type.key}
                    onClick={() => setActiveType(type.key as MediaType)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all duration-300 group ${
                      activeType === type.key
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{type.label}</p>
                      <p
                        className={`text-[10px] ${
                          activeType === type.key ? "text-black/50" : "text-white/30"
                        }`}
                      >
                        {type.aspect} • {count} files
                      </p>
                    </div>
                    {count > 0 && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          activeType === type.key
                            ? "bg-black/10 text-black/60"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9 space-y-8">
            {/* Type Info Banner */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-start gap-4">
              <Info className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg mb-1">{activeTypeConfig.label}</h3>
                <p className="text-white/50 text-sm">{activeTypeConfig.desc}</p>
                <p className="text-white/30 text-xs mt-2">
                  Recommended aspect ratio: {activeTypeConfig.aspect}
                </p>
              </div>
            </div>

            {/* Upload Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ${
                dragActive
                  ? "border-white bg-white/10 scale-[1.02]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={activeType === "video" ? "video/*" : "image/*"}
                onChange={handleFileInput}
                className="hidden"
              />
              <Upload
                className={`w-12 h-12 mb-4 transition-colors ${
                  dragActive ? "text-white" : "text-white/20"
                }`}
              />
              <p className="text-lg font-bold mb-2">
                {dragActive ? "Drop files here" : "Drag & drop or click to upload"}
              </p>
              <p className="text-white/40 text-sm">
                {activeType === "video"
                  ? "Supports MP4, MOV, WebM"
                  : "Supports JPG, PNG, WebP • Max 20MB per file"}
              </p>
            </div>

            {/* Preview Queue */}
            <AnimatePresence>
              {previewFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold">
                      Preview ({previewFiles.length} files)
                    </h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={cancelPreview}
                        className="px-4 py-2 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmUpload}
                        disabled={uploading}
                        className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading {uploadProgress}%
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Upload All
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewFiles.map((pf, i) => (
                      <div key={i} className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
                        <Image
                          src={pf.preview}
                          alt={`Preview ${i}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            URL.revokeObjectURL(pf.preview);
                            setPreviewFiles((prev) => prev.filter((_, idx) => idx !== i));
                          }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-[10px] text-white/70 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 truncate">
                            {pf.file.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upload Progress */}
                  {uploading && (
                    <div className="mt-4">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Existing Media Grid */}
            {mediaLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-white/30" />
              </div>
            ) : activeMedia.length === 0 ? (
              <div className="text-center py-20">
                <ImageIcon className="w-16 h-16 text-white/10 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white/30 mb-2">
                  No {activeTypeConfig.label} uploaded yet
                </h3>
                <p className="text-white/20 text-sm">
                  Upload your premium assets above to get started
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">
                    {activeTypeConfig.label} ({activeMedia.length})
                  </h3>
                  <p className="text-white/30 text-xs">Drag to reorder</p>
                </div>
                <Reorder.Group
                  axis="y"
                  values={activeMedia}
                  onReorder={(newOrder) => handleReorder(newOrder)}
                  className="space-y-3"
                >
                  {activeMedia.map((item) => (
                    <Reorder.Item
                      key={item.id}
                      value={item}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 cursor-grab active:cursor-grabbing hover:bg-white/[0.07] transition-colors"
                    >
                      <GripVertical className="w-5 h-5 text-white/20 flex-shrink-0" />

                      {/* Thumbnail */}
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black">
                        {item.type === "video" ? (
                          <video
                            src={item.url}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <Image
                            src={item.url}
                            alt={item.alt || ""}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {item.isPrimary && (
                            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Primary
                            </span>
                          )}
                          {!item.published && (
                            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                              Hidden
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/40 truncate">
                          {item.width}×{item.height} • {item.format?.toUpperCase()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setPrimary(item.id)}
                          title="Set as primary"
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            item.isPrimary
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60"
                          }`}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => togglePublish(item.id, item.published)}
                          title={item.published ? "Unpublish" : "Publish"}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:bg-white/10 hover:text-white/60 transition-colors"
                        >
                          {item.published ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate([item.id])}
                          title="Delete"
                          className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
