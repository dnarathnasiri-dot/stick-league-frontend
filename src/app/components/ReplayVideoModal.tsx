// src/app/components/ReplayVideoModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface PlayableVideo {
  title: string;
  video: string;
}

interface ReplayVideoModalProps {
  video: PlayableVideo | null;
  onClose: () => void;
}

/**
 * Shared modal video player used across esport pages (Home, Brackets, Matches, ...)
 * wherever a "replay" / "broadcast" thumbnail or button needs to actually play a clip
 * instead of being a static, non-functional placeholder.
 */
const ReplayVideoModal: React.FC<ReplayVideoModalProps> = ({ video, onClose }) => (
  <AnimatePresence>
    {video && (
      <motion.div
        key="replay-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-black border border-primary/40"
        >
          <video
            key={video.video}
            src={video.video}
            autoPlay
            controls
            playsInline
            className="w-full aspect-video bg-black"
          />
          <div className="flex items-center justify-between px-4 py-3 bg-surface-container border-t border-outline-variant/30">
            <span className="font-display text-sm font-bold text-on-surface tracking-wide uppercase">
              {video.title}
            </span>
            <button
              onClick={onClose}
              className="font-mono text-[10px] font-bold tracking-wider text-on-surface-variant hover:text-primary transition-colors"
            >
              CLOSE ✕
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ReplayVideoModal;
