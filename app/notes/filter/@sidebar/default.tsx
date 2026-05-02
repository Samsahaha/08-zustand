import { SidebarNotes } from "@/components/SidebarNotes/SidebarNotes";
import { NOTE_TAGS } from "@/types/note";

export default function FilterSidebarSlot() {
  return <SidebarNotes tags={NOTE_TAGS} />;
}
