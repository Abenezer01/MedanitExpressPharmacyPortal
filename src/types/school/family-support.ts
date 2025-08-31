import Family from "../member/family";

export interface SessionFamilySupport {
  id: string;
  session_id: string;
  family_id: string;
  family?: Family;
  description?: string | null;
  created_at?: string; // Use string to match ISO date from backend
  updated_at?: string;
  familySupportTypes?: FamilySupportTypeWithSessionFamilySupportType[];
}

export interface FamilySupportTypeWithSessionFamilySupportType extends FamilySupportType {
  SessionFamilySupportType?: {
    quantity?: number;
  };
}

export interface FamilySupportType {
  id: string;
  name: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;

}

export interface SessionFamilySupportType {
  id: string;
  sessionfamilysupport_id: string;
  familysupporttype_id: string;
  quantity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SessionFamilySupportTypeWithFamilySupportType extends SessionFamilySupportType {
  familySupportType?: FamilySupportType;
}