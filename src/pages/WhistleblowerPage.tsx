import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Upload } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitComplaint } from "@/lib/api";

export default function WhistleblowerPage() {
  const [form, setForm] = useState({ name: "", entityName: "", department: "", location: "", description: "", amount: "", anonymous: true });
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const mutation = useMutation({
    mutationFn: submitComplaint,
    onSuccess: (data) => {
      setTrackingId(data.tracking_id);
      setSubmitted(true);
      toast.success("Complaint submitted securely");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to submit complaint");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.entityName.trim() || !form.description.trim()) {
      toast.error("Please fill in the required fields");
      return;
    }
    const id = `WB-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    mutation.mutate({
      tracking_id: id,
      entity_name: form.entityName.trim(),
      department: form.department.trim() || undefined,
      location: form.location.trim() || undefined,
      description: form.description.trim(),
      amount: form.amount ? parseInt(form.amount) : undefined,
      anonymous: form.anonymous,
      reporter_name: !form.anonymous ? form.name.trim() || undefined : undefined,
    });
  };

  if (submitted) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel p-8 text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-xl font-bold">Complaint Submitted Securely</h2>
            <p className="text-sm text-muted-foreground mt-2">Your identity is protected. Save your tracking ID:</p>
            <div className="mt-4 p-3 rounded-lg bg-secondary/50 font-mono text-lg text-primary font-bold">{trackingId}</div>
            <Button onClick={() => { setSubmitted(false); setForm({ name: "", entityName: "", department: "", location: "", description: "", amount: "", anonymous: true }); }} className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              Submit Another
            </Button>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold">Whistleblower Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">Report corruption anonymously and securely</p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
          <ShieldCheck className="w-5 h-5 text-success shrink-0" />
          <p className="text-xs text-success">Your identity is encrypted and protected. Reports are stored in secure database.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.anonymous} onChange={(e) => setForm({ ...form, anonymous: e.target.checked })} className="rounded border-border" />
            <span className="text-sm">Submit anonymously</span>
          </label>

          {!form.anonymous && (
            <div>
              <label className="text-xs text-muted-foreground">Your Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          )}

          <div>
            <label className="text-xs text-muted-foreground">Officer / Contractor Name *</label>
            <input value={form.entityName} onChange={(e) => setForm({ ...form, entityName: e.target.value })} required className="w-full mt-1 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Name of the person or company" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Department</label>
              <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full mt-1 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full mt-1 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={4} className="w-full mt-1 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Describe the corruption incident in detail..." />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Estimated Corruption Amount (₹)</label>
            <input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} type="number" className="w-full mt-1 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 5000000" />
          </div>

          <div className="p-4 rounded-lg border border-dashed border-border/50 text-center cursor-pointer hover:bg-secondary/20 transition-colors">
            <Upload className="w-6 h-6 text-muted-foreground mx-auto" />
            <p className="text-xs text-muted-foreground mt-2">Upload evidence (documents, images, videos)</p>
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {mutation.isPending ? "Submitting..." : "Submit Report Securely"}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
