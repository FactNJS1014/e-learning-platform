import React from "react";

export const EmptyState = ({
  message = "No data found.",
}: {
  message?: string;
}) => (
  <div className="text-center p-12 border border-dashed border-rose-200 rounded-3xl bg-rose-50/20">
    <p className="text-sm font-medium text-slate-500">{message}</p>
  </div>
);
