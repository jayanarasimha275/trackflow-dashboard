"use client";

import { Save, Send, X } from "lucide-react";

export default function OfferButtons({
  onCancel,
  onSaveDraft,
  loading,
  mode = "create",
}) {
  return (
    <div className="sticky bottom-0 z-20 mt-8 flex flex-wrap items-center justify-end gap-4 rounded-3xl border border-slate-800 bg-[#111827]/95 p-5 backdrop-blur">
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 text-red-400 transition hover:bg-red-500/10"
      >
        <X size={18} />
        Cancel
      </button>

      <button
        type="button"
        onClick={onSaveDraft}
        className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:border-slate-500 hover:bg-slate-800"
      >
        <Save size={18} />
        Save Draft
      </button>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send size={18} />
        {loading
          ? mode === "edit"
            ? "Saving..."
            : "Creating..."
          : mode === "edit"
            ? "Save Changes"
            : "Create Offer"}
      </button>
    </div>
  );
}
