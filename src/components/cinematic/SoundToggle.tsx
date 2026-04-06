import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { cinematicAudio } from "@/lib/cinematicAudio";

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(cinematicAudio.isEnabled());

  const handleToggle = () => {
    const newState = cinematicAudio.toggle();
    setEnabled(newState);
    if (newState) cinematicAudio.playClick();
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full glass-panel border border-border/50 transition-all duration-300 hover:border-primary/40 hover:scale-110"
      title={enabled ? "Mute ambient sounds" : "Enable ambient sounds"}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-primary" />
      ) : (
        <VolumeX className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
};

export default SoundToggle;
