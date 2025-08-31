export interface ChildParent {
    id?: string; // UUID for the record
    child_id: string; // UUID of the child
    parent_id: string | null; // UUID of the parent, nullable
    relationship?: ChildParentRelationshipType; // Type of relationship
    created_at?: string; // Timestamp for when the record was created
    updated_at?: string; // Timestamp for when the record was last updated
}

export enum ChildParentRelationshipType {
    MOM = 'MOM',
    DAD = 'DAD',
    GUARDIAN = 'GUARDIAN',
}
