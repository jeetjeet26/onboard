// Generated from Supabase project qkkevxnbmaamtdtgtkmb. Do not edit by hand.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      Activity: {
        Row: {
          activity_class: string | null
          activity_priority: Json | null
          AffiliationID: number | null
          against: string | null
          AgainstID: number | null
          AgainstType: string | null
          Billable: number | null
          Body: string | null
          class: string | null
          Confidential: number | null
          ContractID: number | null
          ContractPeriodID: string | null
          date_logged: string | null
          DateCreated: string | null
          DateEnded: number | null
          DateModified: string | null
          DateStarted: number | null
          Details: string | null
          html_body: string | null
          ID: number
          InvoiceID: number | null
          IsDeleted: boolean
          JobID: number | null
          Medium: string | null
          MilestoneID: number | null
          MirrorRemoteID: number
          Nonbillable: number | null
          owner: string | null
          OwnerAffiliationID: number | null
          OwnerID: number | null
          OwnerStaffID: number | null
          OwnerType: string | null
          parent: string | null
          ParentID: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          preview_body: string | null
          priority: string | null
          Rate: number | null
          RateCharged: number | null
          RawPayload: Json | null
          RemoteID: string
          RequestID: number | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Staff: number | null
          StaffID: number | null
          Standing: string | null
          Subject: string | null
          Task: number | null
          thread: string | null
          ThreadID: number | null
          time_allocation: string | null
          Visibility: string | null
          WhenCreated: string | null
          WhenEnded: string | null
          WhenModified: string | null
          WhenStarted: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          activity_class?: string | null
          activity_priority?: Json | null
          AffiliationID?: number | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          Billable?: number | null
          Body?: string | null
          class?: string | null
          Confidential?: number | null
          ContractID?: number | null
          ContractPeriodID?: string | null
          date_logged?: string | null
          DateCreated?: string | null
          DateEnded?: number | null
          DateModified?: string | null
          DateStarted?: number | null
          Details?: string | null
          html_body?: string | null
          ID: number
          InvoiceID?: number | null
          IsDeleted: boolean
          JobID?: number | null
          Medium?: string | null
          MilestoneID?: number | null
          MirrorRemoteID: number
          Nonbillable?: number | null
          owner?: string | null
          OwnerAffiliationID?: number | null
          OwnerID?: number | null
          OwnerStaffID?: number | null
          OwnerType?: string | null
          parent?: string | null
          ParentID?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          preview_body?: string | null
          priority?: string | null
          Rate?: number | null
          RateCharged?: number | null
          RawPayload?: Json | null
          RemoteID: string
          RequestID?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Staff?: number | null
          StaffID?: number | null
          Standing?: string | null
          Subject?: string | null
          Task?: number | null
          thread?: string | null
          ThreadID?: number | null
          time_allocation?: string | null
          Visibility?: string | null
          WhenCreated?: string | null
          WhenEnded?: string | null
          WhenModified?: string | null
          WhenStarted?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          activity_class?: string | null
          activity_priority?: Json | null
          AffiliationID?: number | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          Billable?: number | null
          Body?: string | null
          class?: string | null
          Confidential?: number | null
          ContractID?: number | null
          ContractPeriodID?: string | null
          date_logged?: string | null
          DateCreated?: string | null
          DateEnded?: number | null
          DateModified?: string | null
          DateStarted?: number | null
          Details?: string | null
          html_body?: string | null
          ID?: number
          InvoiceID?: number | null
          IsDeleted?: boolean
          JobID?: number | null
          Medium?: string | null
          MilestoneID?: number | null
          MirrorRemoteID?: number
          Nonbillable?: number | null
          owner?: string | null
          OwnerAffiliationID?: number | null
          OwnerID?: number | null
          OwnerStaffID?: number | null
          OwnerType?: string | null
          parent?: string | null
          ParentID?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          preview_body?: string | null
          priority?: string | null
          Rate?: number | null
          RateCharged?: number | null
          RawPayload?: Json | null
          RemoteID?: string
          RequestID?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Staff?: number | null
          StaffID?: number | null
          Standing?: string | null
          Subject?: string | null
          Task?: number | null
          thread?: string | null
          ThreadID?: number | null
          time_allocation?: string | null
          Visibility?: string | null
          WhenCreated?: string | null
          WhenEnded?: string | null
          WhenModified?: string | null
          WhenStarted?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_activity_affiliation"
            columns: ["AffiliationID"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_contract"
            columns: ["ContractID"]
            isOneToOne: false
            referencedRelation: "Contract"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_invoice"
            columns: ["InvoiceID"]
            isOneToOne: false
            referencedRelation: "Invoice"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_job"
            columns: ["JobID"]
            isOneToOne: false
            referencedRelation: "Job"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_milestone"
            columns: ["MilestoneID"]
            isOneToOne: false
            referencedRelation: "Milestone"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_owner_affiliation"
            columns: ["OwnerAffiliationID"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_owner_staff"
            columns: ["OwnerStaffID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_rate"
            columns: ["Rate"]
            isOneToOne: false
            referencedRelation: "Rate"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_staff"
            columns: ["StaffID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_staff_member"
            columns: ["Staff"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_activity_task"
            columns: ["Task"]
            isOneToOne: false
            referencedRelation: "Task"
            referencedColumns: ["ID"]
          },
        ]
      }
      ActivityClass: {
        Row: {
          ActivityID: number
          ActivityRemoteID: string | null
          icon: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Parent: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          Status: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ActivityID: number
          ActivityRemoteID?: string | null
          icon?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Parent?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          Status?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ActivityID?: number
          ActivityRemoteID?: string | null
          icon?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Parent?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          Status?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ActivityPriority: {
        Row: {
          ActivityID: number
          ActivityRemoteID: string | null
          icon: string | null
          ID: number
          IsDeleted: boolean
          Level: number | null
          MirrorRemoteID: number
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ActivityID: number
          ActivityRemoteID?: string | null
          icon?: string | null
          ID: number
          IsDeleted: boolean
          Level?: number | null
          MirrorRemoteID: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ActivityID?: number
          ActivityRemoteID?: string | null
          icon?: string | null
          ID?: number
          IsDeleted?: boolean
          Level?: number | null
          MirrorRemoteID?: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ActivityTimeAllocation: {
        Row: {
          ActivityID: number
          ActivityRemoteID: string | null
          against: string | null
          AgainstID: number | null
          AgainstType: string | null
          Billable: number
          Charged: number | null
          Comments: string | null
          DateCreated: number | null
          DateLocked: number | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Nonbillable: number
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ActivityID: number
          ActivityRemoteID?: string | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          Billable: number
          Charged?: number | null
          Comments?: string | null
          DateCreated?: number | null
          DateLocked?: number | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Nonbillable: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ActivityID?: number
          ActivityRemoteID?: string | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          Billable?: number
          Charged?: number | null
          Comments?: string | null
          DateCreated?: number | null
          DateLocked?: number | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Nonbillable?: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Address: {
        Row: {
          addresses: Json | null
          City: string | null
          country: string | null
          CountryID: number | null
          CustomID: string | null
          Full: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          ParentRecordID: string | null
          ParentTable: string | null
          Physical: string | null
          Postal: string | null
          RawPayload: Json | null
          RemoteID: string | null
          short: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          state: string | null
          StateID: number | null
          Street1: string | null
          Street2: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
          zipcode: string | null
        }
        Insert: {
          addresses?: Json | null
          City?: string | null
          country?: string | null
          CountryID?: number | null
          CustomID?: string | null
          Full?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          Physical?: string | null
          Postal?: string | null
          RawPayload?: Json | null
          RemoteID?: string | null
          short?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          state?: string | null
          StateID?: number | null
          Street1?: string | null
          Street2?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
          zipcode?: string | null
        }
        Update: {
          addresses?: Json | null
          City?: string | null
          country?: string | null
          CountryID?: number | null
          CustomID?: string | null
          Full?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          Physical?: string | null
          Postal?: string | null
          RawPayload?: Json | null
          RemoteID?: string | null
          short?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          state?: string | null
          StateID?: number | null
          Street1?: string | null
          Street2?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
          zipcode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_address_country"
            columns: ["CountryID"]
            isOneToOne: false
            referencedRelation: "Country"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_address_state"
            columns: ["StateID"]
            isOneToOne: false
            referencedRelation: "State"
            referencedColumns: ["ID"]
          },
        ]
      }
      Affiliation: {
        Row: {
          affiliation_status: string | null
          communication: string | null
          Company: number | null
          Contact: number | null
          DateCreated: number | null
          DateLastInteracted: number | null
          DateModified: number | null
          Email: string | null
          Fax: string | null
          ID: number
          InvoiceMethod: string | null
          IsDeleted: boolean
          MirrorRemoteID: number
          Mobile: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          Phone: string | null
          PhysicalAddress: number | null
          PortalAccess: string | null
          Position: string | null
          PostalAddress: number | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          StaffBookmarked: boolean | null
          Standing: string | null
          status: string | null
          StatusID: number | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          affiliation_status?: string | null
          communication?: string | null
          Company?: number | null
          Contact?: number | null
          DateCreated?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          Email?: string | null
          Fax?: string | null
          ID: number
          InvoiceMethod?: string | null
          IsDeleted: boolean
          MirrorRemoteID: number
          Mobile?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Phone?: string | null
          PhysicalAddress?: number | null
          PortalAccess?: string | null
          Position?: string | null
          PostalAddress?: number | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          affiliation_status?: string | null
          communication?: string | null
          Company?: number | null
          Contact?: number | null
          DateCreated?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          Email?: string | null
          Fax?: string | null
          ID?: number
          InvoiceMethod?: string | null
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Mobile?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Phone?: string | null
          PhysicalAddress?: number | null
          PortalAccess?: string | null
          Position?: string | null
          PostalAddress?: number | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_affiliation_company"
            columns: ["Company"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_affiliation_contact"
            columns: ["Contact"]
            isOneToOne: false
            referencedRelation: "Contact"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_affiliation_physical_address"
            columns: ["PhysicalAddress"]
            isOneToOne: false
            referencedRelation: "Address"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_affiliation_postal_address"
            columns: ["PostalAddress"]
            isOneToOne: false
            referencedRelation: "Address"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_affiliation_status"
            columns: ["StatusID"]
            isOneToOne: false
            referencedRelation: "AffiliationStatus"
            referencedColumns: ["ID"]
          },
        ]
      }
      AffiliationProfileField: {
        Row: {
          ID: number
          IsDeleted: boolean | null
          MirrorRemoteID: number | null
          RemoteID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      AffiliationProfileValue: {
        Row: {
          ID: number
          IsDeleted: boolean | null
          MirrorRemoteID: number | null
          RemoteID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      AffiliationStatus: {
        Row: {
          AffiliationRemoteID: string | null
          Color: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          start: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          AffiliationRemoteID?: string | null
          Color?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          AffiliationRemoteID?: string | null
          Color?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Asset: {
        Row: {
          AddressID: number | null
          Affiliation: number | null
          AffiliationID: number | null
          AgainstID: number | null
          AgainstType: string | null
          AssetLinkID: number | null
          AssetTypeID: number | null
          DateCreated: number | null
          Fax: string | null
          ID: number
          IsDeleted: boolean
          LinkedContractID: number | null
          LinkedIssueID: number | null
          LinkedJobID: number | null
          LinkedProspectID: number | null
          LinkEndDate: string | null
          LinkStartDate: string | null
          ManagerID: number | null
          MirrorRemoteID: number
          RemoteID: string
          Standing: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          AddressID?: number | null
          Affiliation?: number | null
          AffiliationID?: number | null
          AgainstID?: number | null
          AgainstType?: string | null
          AssetLinkID?: number | null
          AssetTypeID?: number | null
          DateCreated?: number | null
          Fax?: string | null
          ID: number
          IsDeleted: boolean
          LinkedContractID?: number | null
          LinkedIssueID?: number | null
          LinkedJobID?: number | null
          LinkedProspectID?: number | null
          LinkEndDate?: string | null
          LinkStartDate?: string | null
          ManagerID?: number | null
          MirrorRemoteID: number
          RemoteID: string
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          AddressID?: number | null
          Affiliation?: number | null
          AffiliationID?: number | null
          AgainstID?: number | null
          AgainstType?: string | null
          AssetLinkID?: number | null
          AssetTypeID?: number | null
          DateCreated?: number | null
          Fax?: string | null
          ID?: number
          IsDeleted?: boolean
          LinkedContractID?: number | null
          LinkedIssueID?: number | null
          LinkedJobID?: number | null
          LinkedProspectID?: number | null
          LinkEndDate?: string | null
          LinkStartDate?: string | null
          ManagerID?: number | null
          MirrorRemoteID?: number
          RemoteID?: string
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_asset_address"
            columns: ["AddressID"]
            isOneToOne: false
            referencedRelation: "Address"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_asset_affiliation"
            columns: ["Affiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_asset_affiliation_id"
            columns: ["AffiliationID"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_asset_linked_contract"
            columns: ["LinkedContractID"]
            isOneToOne: false
            referencedRelation: "Contract"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_asset_linked_issue"
            columns: ["LinkedIssueID"]
            isOneToOne: false
            referencedRelation: "Issue"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_asset_linked_job"
            columns: ["LinkedJobID"]
            isOneToOne: false
            referencedRelation: "Job"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_asset_linked_prospect"
            columns: ["LinkedProspectID"]
            isOneToOne: false
            referencedRelation: "Prospect"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_asset_manager"
            columns: ["ManagerID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_asset_type"
            columns: ["AssetTypeID"]
            isOneToOne: false
            referencedRelation: "AssetType"
            referencedColumns: ["ID"]
          },
        ]
      }
      AssetCustomField: {
        Row: {
          FieldName: string | null
          FieldType: string | null
          ID: number
          IsDeleted: boolean
          LinkTypeID: number
          MirrorRemoteID: number
          RemoteID: string
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          FieldName?: string | null
          FieldType?: string | null
          ID: number
          IsDeleted: boolean
          LinkTypeID: number
          MirrorRemoteID: number
          RemoteID: string
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          FieldName?: string | null
          FieldType?: string | null
          ID?: number
          IsDeleted?: boolean
          LinkTypeID?: number
          MirrorRemoteID?: number
          RemoteID?: string
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      AssetCustomFieldOption: {
        Row: {
          AssetCustomFieldRemoteID: string | null
          CustomFieldID: number
          IsDeleted: boolean
          LineNumber: number
          MirrorRemoteID: number
          RemoteID: string
          Value: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          AssetCustomFieldRemoteID?: string | null
          CustomFieldID: number
          IsDeleted: boolean
          LineNumber: number
          MirrorRemoteID: number
          RemoteID: string
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          AssetCustomFieldRemoteID?: string | null
          CustomFieldID?: number
          IsDeleted?: boolean
          LineNumber?: number
          MirrorRemoteID?: number
          RemoteID?: string
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_asset_custom_field_option_field"
            columns: ["CustomFieldID"]
            isOneToOne: false
            referencedRelation: "AssetCustomField"
            referencedColumns: ["ID"]
          },
        ]
      }
      AssetType: {
        Row: {
          has_address: string | null
          has_affiliation: string | null
          has_manager: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          object_link_fields: string | null
          ordering: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          has_address?: string | null
          has_affiliation?: string | null
          has_manager?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          object_link_fields?: string | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          has_address?: string | null
          has_affiliation?: string | null
          has_manager?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          object_link_fields?: string | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Checklist: {
        Row: {
          against_id: string | null
          against_type: string | null
          created_by: string | null
          date_created: string | null
          id: string
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          against_id?: string | null
          against_type?: string | null
          created_by?: string | null
          date_created?: string | null
          id: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          against_id?: string | null
          against_type?: string | null
          created_by?: string | null
          date_created?: string | null
          id?: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ChecklistItem: {
        Row: {
          checklist_id: string | null
          complete: string | null
          completed_by: string | null
          created_by: string | null
          date_completed: string | null
          date_created: string | null
          date_modified: string | null
          id: string
          IsDeleted: boolean | null
          modified_by: string | null
          ordering: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          checklist_id?: string | null
          complete?: string | null
          completed_by?: string | null
          created_by?: string | null
          date_completed?: string | null
          date_created?: string | null
          date_modified?: string | null
          id: string
          IsDeleted?: boolean | null
          modified_by?: string | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          checklist_id?: string | null
          complete?: string | null
          completed_by?: string | null
          created_by?: string | null
          date_completed?: string | null
          date_created?: string | null
          date_modified?: string | null
          id?: string
          IsDeleted?: boolean | null
          modified_by?: string | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Company: {
        Row: {
          Comments: string | null
          company_status: string | null
          CompanyStatusID: number | null
          CustomID: string | null
          DateCreated: number | null
          DateLastInteracted: number | null
          DateModified: number | null
          DefaultAffiliation: number | null
          Fax: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Name: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          Phone: string | null
          PostalAddress: number | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          StaffBookmarked: boolean | null
          Standing: string | null
          status: string | null
          Website: string | null
          WhenCreated: string | null
          WhenLastInteracted: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Comments?: string | null
          company_status?: string | null
          CompanyStatusID?: number | null
          CustomID?: string | null
          DateCreated?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          DefaultAffiliation?: number | null
          Fax?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Name?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Phone?: string | null
          PostalAddress?: number | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          Website?: string | null
          WhenCreated?: string | null
          WhenLastInteracted?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Comments?: string | null
          company_status?: string | null
          CompanyStatusID?: number | null
          CustomID?: string | null
          DateCreated?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          DefaultAffiliation?: number | null
          Fax?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Name?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Phone?: string | null
          PostalAddress?: number | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          Website?: string | null
          WhenCreated?: string | null
          WhenLastInteracted?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_company_default_affiliation"
            columns: ["DefaultAffiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_company_postal_address"
            columns: ["PostalAddress"]
            isOneToOne: false
            referencedRelation: "Address"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_company_status"
            columns: ["CompanyStatusID"]
            isOneToOne: false
            referencedRelation: "CompanyStatus"
            referencedColumns: ["ID"]
          },
        ]
      }
      CompanyProfileField: {
        Row: {
          confidential: string | null
          description: string | null
          exported: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_type: string | null
          lookup_type: string | null
          options: Json | null
          parent_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          required: string | null
          restrictions: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      CompanyProfileValue: {
        Row: {
          date_modified: string | null
          field_id: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_id: string | null
          link_type: string | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          value: string | null
          value_id: string | null
          value_type: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      CompanyStatus: {
        Row: {
          Color: string | null
          CompanyRemoteID: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          start: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Color?: string | null
          CompanyRemoteID?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Color?: string | null
          CompanyRemoteID?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Contact: {
        Row: {
          Comments: string | null
          contact_status: string | null
          DateCreated: number | null
          DateLastInteracted: number | null
          DateModified: number | null
          DefaultAffiliation: number | null
          email: string | null
          Firstname: string | null
          ID: number
          IsDeleted: boolean
          Lastname: string | null
          Middlename: string | null
          MirrorRemoteID: number
          mobile: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          status: string | null
          surname: string | null
          Timezone: string | null
          Title: string | null
          Username: string | null
          WhenCreated: string | null
          WhenLastInteracted: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Comments?: string | null
          contact_status?: string | null
          DateCreated?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          DefaultAffiliation?: number | null
          email?: string | null
          Firstname?: string | null
          ID: number
          IsDeleted: boolean
          Lastname?: string | null
          Middlename?: string | null
          MirrorRemoteID: number
          mobile?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          status?: string | null
          surname?: string | null
          Timezone?: string | null
          Title?: string | null
          Username?: string | null
          WhenCreated?: string | null
          WhenLastInteracted?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Comments?: string | null
          contact_status?: string | null
          DateCreated?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          DefaultAffiliation?: number | null
          email?: string | null
          Firstname?: string | null
          ID?: number
          IsDeleted?: boolean
          Lastname?: string | null
          Middlename?: string | null
          MirrorRemoteID?: number
          mobile?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          status?: string | null
          surname?: string | null
          Timezone?: string | null
          Title?: string | null
          Username?: string | null
          WhenCreated?: string | null
          WhenLastInteracted?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_contact_default_affiliation"
            columns: ["DefaultAffiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
        ]
      }
      ContactProfileField: {
        Row: {
          confidential: string | null
          description: string | null
          exported: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_type: string | null
          lookup_type: string | null
          parent_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          required: string | null
          restrictions: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ContactProfileValue: {
        Row: {
          date_modified: string | null
          field_id: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_id: string | null
          link_type: string | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          value: string | null
          value_type: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ContactStatus: {
        Row: {
          color: string | null
          id: string
          IsDeleted: boolean | null
          ordering: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          start: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          color?: string | null
          id: string
          IsDeleted?: boolean | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          start?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          color?: string | null
          id?: string
          IsDeleted?: boolean | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          start?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Contract: {
        Row: {
          affiliation: string | null
          Against: string | null
          against_type: string | null
          AgainstID: number | null
          AutoRenew: boolean | null
          billable: string | null
          BillableAffiliation: number | null
          Company: number | null
          ContractStatus: number | null
          ContractType: number | null
          date_last_interacted: string | null
          DateCreated: number | null
          DateExpires: number | null
          DatePeriodExpires: number | null
          DateStarted: number | null
          deployment: string | null
          ID: number
          IsDeleted: boolean
          Job: number | null
          Manager: number | null
          MirrorRemoteID: number
          Notes: string | null
          OwnerAffiliation: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          PeriodTemplateID: number | null
          RawPayload: Json | null
          RemoteID: string
          RenewDays: string | null
          SendInvoice: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          StaffBookmarked: boolean | null
          Standing: string | null
          status: string | null
          Title: string | null
          type: string | null
          Value: number | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          affiliation?: string | null
          Against?: string | null
          against_type?: string | null
          AgainstID?: number | null
          AutoRenew?: boolean | null
          billable?: string | null
          BillableAffiliation?: number | null
          Company?: number | null
          ContractStatus?: number | null
          ContractType?: number | null
          date_last_interacted?: string | null
          DateCreated?: number | null
          DateExpires?: number | null
          DatePeriodExpires?: number | null
          DateStarted?: number | null
          deployment?: string | null
          ID: number
          IsDeleted: boolean
          Job?: number | null
          Manager?: number | null
          MirrorRemoteID: number
          Notes?: string | null
          OwnerAffiliation?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          PeriodTemplateID?: number | null
          RawPayload?: Json | null
          RemoteID: string
          RenewDays?: string | null
          SendInvoice?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          Title?: string | null
          type?: string | null
          Value?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          affiliation?: string | null
          Against?: string | null
          against_type?: string | null
          AgainstID?: number | null
          AutoRenew?: boolean | null
          billable?: string | null
          BillableAffiliation?: number | null
          Company?: number | null
          ContractStatus?: number | null
          ContractType?: number | null
          date_last_interacted?: string | null
          DateCreated?: number | null
          DateExpires?: number | null
          DatePeriodExpires?: number | null
          DateStarted?: number | null
          deployment?: string | null
          ID?: number
          IsDeleted?: boolean
          Job?: number | null
          Manager?: number | null
          MirrorRemoteID?: number
          Notes?: string | null
          OwnerAffiliation?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          PeriodTemplateID?: number | null
          RawPayload?: Json | null
          RemoteID?: string
          RenewDays?: string | null
          SendInvoice?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          Title?: string | null
          type?: string | null
          Value?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_contract_billable_affiliation"
            columns: ["BillableAffiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_contract_company"
            columns: ["Company"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_contract_job"
            columns: ["Job"]
            isOneToOne: false
            referencedRelation: "Job"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_contract_manager"
            columns: ["Manager"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_contract_owner_affiliation"
            columns: ["OwnerAffiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_contract_status"
            columns: ["ContractStatus"]
            isOneToOne: false
            referencedRelation: "ContractStatus"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_contract_type"
            columns: ["ContractType"]
            isOneToOne: false
            referencedRelation: "ContractType"
            referencedColumns: ["ID"]
          },
        ]
      }
      ContractBudget: {
        Row: {
          against: string | null
          AgainstID: number | null
          AgainstType: string | null
          ContractPeriodRemoteID: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          ParentRecordID: string | null
          ParentTable: string | null
          ProductCharged: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Time: number | null
          TimeCharged: string | null
          Value: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          ContractPeriodRemoteID?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          ProductCharged?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Time?: number | null
          TimeCharged?: string | null
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          ContractPeriodRemoteID?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          ProductCharged?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Time?: number | null
          TimeCharged?: string | null
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ContractPeriod: {
        Row: {
          AllowanceBillable: number | null
          AllowanceCharged: number | null
          AllowanceType: string | null
          BudgetType: string | null
          BudgetUsedType: string | null
          BudgetUsedValue: number | null
          contract: string | null
          contract_budget: Json | null
          ContractBudgetID: number | null
          ContractID: number | null
          ContractRemoteID: string | null
          DateClosed: number | null
          DateCommenced: number | null
          DateCreated: number | null
          DateExpires: number | null
          DurationType: string | null
          ID: number
          IncludeExpense: boolean | null
          IncludeMaterial: boolean | null
          IncludeUsageGraph: boolean | null
          IsDeleted: boolean
          MirrorRemoteID: number
          ParentRecordID: string | null
          ParentTable: string | null
          price: string | null
          rate: Json | null
          RateCharged: number | null
          RateID: number | null
          RateType: string | null
          RawPayload: Json | null
          RemoteID: string
          Rollover: boolean | null
          ServiceItemID: number | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          time_allocations: string | null
          UnapprovedBudgetUsed: number | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          AllowanceBillable?: number | null
          AllowanceCharged?: number | null
          AllowanceType?: string | null
          BudgetType?: string | null
          BudgetUsedType?: string | null
          BudgetUsedValue?: number | null
          contract?: string | null
          contract_budget?: Json | null
          ContractBudgetID?: number | null
          ContractID?: number | null
          ContractRemoteID?: string | null
          DateClosed?: number | null
          DateCommenced?: number | null
          DateCreated?: number | null
          DateExpires?: number | null
          DurationType?: string | null
          ID: number
          IncludeExpense?: boolean | null
          IncludeMaterial?: boolean | null
          IncludeUsageGraph?: boolean | null
          IsDeleted: boolean
          MirrorRemoteID: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          price?: string | null
          rate?: Json | null
          RateCharged?: number | null
          RateID?: number | null
          RateType?: string | null
          RawPayload?: Json | null
          RemoteID: string
          Rollover?: boolean | null
          ServiceItemID?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          time_allocations?: string | null
          UnapprovedBudgetUsed?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          AllowanceBillable?: number | null
          AllowanceCharged?: number | null
          AllowanceType?: string | null
          BudgetType?: string | null
          BudgetUsedType?: string | null
          BudgetUsedValue?: number | null
          contract?: string | null
          contract_budget?: Json | null
          ContractBudgetID?: number | null
          ContractID?: number | null
          ContractRemoteID?: string | null
          DateClosed?: number | null
          DateCommenced?: number | null
          DateCreated?: number | null
          DateExpires?: number | null
          DurationType?: string | null
          ID?: number
          IncludeExpense?: boolean | null
          IncludeMaterial?: boolean | null
          IncludeUsageGraph?: boolean | null
          IsDeleted?: boolean
          MirrorRemoteID?: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          price?: string | null
          rate?: Json | null
          RateCharged?: number | null
          RateID?: number | null
          RateType?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          Rollover?: boolean | null
          ServiceItemID?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          time_allocations?: string | null
          UnapprovedBudgetUsed?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_contract_period_contract"
            columns: ["ContractID"]
            isOneToOne: false
            referencedRelation: "Contract"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_contract_period_rate"
            columns: ["RateID"]
            isOneToOne: false
            referencedRelation: "Rate"
            referencedColumns: ["ID"]
          },
        ]
      }
      ContractProfileField: {
        Row: {
          confidential: string | null
          description: string | null
          exported: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_type: string | null
          lookup_type: string | null
          options: Json | null
          parent_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          required: string | null
          restrictions: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ContractProfileValue: {
        Row: {
          date_modified: string | null
          field_id: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_id: string | null
          link_type: string | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          value: string | null
          value_id: string | null
          value_type: string | null
          values: Json | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          values?: Json | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          values?: Json | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ContractStatus: {
        Row: {
          Color: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          start: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Color?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Color?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ContractType: {
        Row: {
          AutoCompleteTask: boolean | null
          AutoRenew: boolean | null
          ID: number
          InvoiceTemplateID: number | null
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering: number | null
          Parent: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          PeriodTemplateID: number | null
          RawPayload: Json | null
          RemoteID: string | null
          RenewDays: string | null
          SendInvoice: string | null
          service_ledger_id: string | null
          ServiceTaxID: number | null
          ServiceTaxLedgerID: number | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          Title: string | null
          types: Json | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          AutoCompleteTask?: boolean | null
          AutoRenew?: boolean | null
          ID: number
          InvoiceTemplateID?: number | null
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering?: number | null
          Parent?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          PeriodTemplateID?: number | null
          RawPayload?: Json | null
          RemoteID?: string | null
          RenewDays?: string | null
          SendInvoice?: string | null
          service_ledger_id?: string | null
          ServiceTaxID?: number | null
          ServiceTaxLedgerID?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          types?: Json | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          AutoCompleteTask?: boolean | null
          AutoRenew?: boolean | null
          ID?: number
          InvoiceTemplateID?: number | null
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Ordering?: number | null
          Parent?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          PeriodTemplateID?: number | null
          RawPayload?: Json | null
          RemoteID?: string | null
          RenewDays?: string | null
          SendInvoice?: string | null
          service_ledger_id?: string | null
          ServiceTaxID?: number | null
          ServiceTaxLedgerID?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          types?: Json | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Contributor: {
        Row: {
          against_id: string | null
          against_type: string | null
          auto_cc: string | null
          contributor_type: string | null
          contributor_type_id: string | null
          description: string | null
          id: string
          IsDeleted: boolean | null
          object_id: string | null
          object_type: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          status_id: string | null
          type_id: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          against_id?: string | null
          against_type?: string | null
          auto_cc?: string | null
          contributor_type?: string | null
          contributor_type_id?: string | null
          description?: string | null
          id: string
          IsDeleted?: boolean | null
          object_id?: string | null
          object_type?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          status_id?: string | null
          type_id?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          against_id?: string | null
          against_type?: string | null
          auto_cc?: string | null
          contributor_type?: string | null
          contributor_type_id?: string | null
          description?: string | null
          id?: string
          IsDeleted?: boolean | null
          object_id?: string | null
          object_type?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          status_id?: string | null
          type_id?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ContributorType: {
        Row: {
          auto_cc: string | null
          default_standing: string | null
          default_status_id: string | null
          has_status: string | null
          id: string
          IsDeleted: boolean | null
          ordering: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          auto_cc?: string | null
          default_standing?: string | null
          default_status_id?: string | null
          has_status?: string | null
          id: string
          IsDeleted?: boolean | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          auto_cc?: string | null
          default_standing?: string | null
          default_status_id?: string | null
          has_status?: string | null
          id?: string
          IsDeleted?: boolean | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Country: {
        Row: {
          AddressRemoteID: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          PostcodeName: string | null
          PostcodeRequired: string | null
          Prefix: string | null
          RemoteID: string
          StateName: string | null
          StateRequired: string | null
          Suffix: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          AddressRemoteID?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          PostcodeName?: string | null
          PostcodeRequired?: string | null
          Prefix?: string | null
          RemoteID: string
          StateName?: string | null
          StateRequired?: string | null
          Suffix?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          AddressRemoteID?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          PostcodeName?: string | null
          PostcodeRequired?: string | null
          Prefix?: string | null
          RemoteID?: string
          StateName?: string | null
          StateRequired?: string | null
          Suffix?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Division: {
        Row: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          RemoteID: string
          Standing: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          RemoteID: string
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          RemoteID?: string
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Expense: {
        Row: {
          activity: string | null
          ActivityID: number | null
          AgainstID: number | null
          AgainstType: string | null
          approver: string | null
          approver_id: string | null
          Billable: string | null
          ContractBudgetID: number | null
          date_reimbursed: string | null
          DateIncurred: string | null
          expense_template: string | null
          expense_type: string | null
          expenses: Json | null
          ID: number
          IsDeleted: boolean
          IssueID: number | null
          JobID: number | null
          MirrorRemoteID: number
          ParentRecordID: string | null
          ParentTable: string | null
          Price: number | null
          Quantity: number | null
          RawPayload: Json | null
          Reimbursable: string | null
          reimburser_id: string | null
          RemoteID: string
          resource: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          submitter: string | null
          SubmitterID: number | null
          tax_override: string | null
          tax_setting: string | null
          Title: string | null
          type: string | null
          TypeID: number | null
          UnitCost: number | null
          vendor: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          activity?: string | null
          ActivityID?: number | null
          AgainstID?: number | null
          AgainstType?: string | null
          approver?: string | null
          approver_id?: string | null
          Billable?: string | null
          ContractBudgetID?: number | null
          date_reimbursed?: string | null
          DateIncurred?: string | null
          expense_template?: string | null
          expense_type?: string | null
          expenses?: Json | null
          ID: number
          IsDeleted: boolean
          IssueID?: number | null
          JobID?: number | null
          MirrorRemoteID: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          Price?: number | null
          Quantity?: number | null
          RawPayload?: Json | null
          Reimbursable?: string | null
          reimburser_id?: string | null
          RemoteID: string
          resource?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          submitter?: string | null
          SubmitterID?: number | null
          tax_override?: string | null
          tax_setting?: string | null
          Title?: string | null
          type?: string | null
          TypeID?: number | null
          UnitCost?: number | null
          vendor?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          activity?: string | null
          ActivityID?: number | null
          AgainstID?: number | null
          AgainstType?: string | null
          approver?: string | null
          approver_id?: string | null
          Billable?: string | null
          ContractBudgetID?: number | null
          date_reimbursed?: string | null
          DateIncurred?: string | null
          expense_template?: string | null
          expense_type?: string | null
          expenses?: Json | null
          ID?: number
          IsDeleted?: boolean
          IssueID?: number | null
          JobID?: number | null
          MirrorRemoteID?: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          Price?: number | null
          Quantity?: number | null
          RawPayload?: Json | null
          Reimbursable?: string | null
          reimburser_id?: string | null
          RemoteID?: string
          resource?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          submitter?: string | null
          SubmitterID?: number | null
          tax_override?: string | null
          tax_setting?: string | null
          Title?: string | null
          type?: string | null
          TypeID?: number | null
          UnitCost?: number | null
          vendor?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_expense_activity"
            columns: ["ActivityID"]
            isOneToOne: false
            referencedRelation: "Activity"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_expense_issue"
            columns: ["IssueID"]
            isOneToOne: false
            referencedRelation: "Issue"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_expense_job"
            columns: ["JobID"]
            isOneToOne: false
            referencedRelation: "Job"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_expense_submitter"
            columns: ["SubmitterID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_expense_type"
            columns: ["TypeID"]
            isOneToOne: false
            referencedRelation: "ExpenseType"
            referencedColumns: ["ID"]
          },
        ]
      }
      ExpenseType: {
        Row: {
          allowed_on_expense: string | null
          allowed_on_material: string | null
          allowed_on_service: string | null
          code: string | null
          cost: string | null
          cost_ledger: string | null
          cost_ledger_id: string | null
          cost_rate_id: string | null
          cost_tax: string | null
          cost_tax_id: string | null
          description: string | null
          expense_type_ledger: string | null
          ID: number
          IsDeleted: boolean
          LedgerID: number | null
          line_item_ledger: string | null
          MirrorRemoteID: number
          ordering: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          price: string | null
          price_rate_id: string | null
          quantity: string | null
          RawPayload: Json | null
          RemoteID: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          tax: string | null
          TaxID: number | null
          Title: string | null
          type: string | null
          types: Json | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          allowed_on_expense?: string | null
          allowed_on_material?: string | null
          allowed_on_service?: string | null
          code?: string | null
          cost?: string | null
          cost_ledger?: string | null
          cost_ledger_id?: string | null
          cost_rate_id?: string | null
          cost_tax?: string | null
          cost_tax_id?: string | null
          description?: string | null
          expense_type_ledger?: string | null
          ID: number
          IsDeleted: boolean
          LedgerID?: number | null
          line_item_ledger?: string | null
          MirrorRemoteID: number
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          price?: string | null
          price_rate_id?: string | null
          quantity?: string | null
          RawPayload?: Json | null
          RemoteID?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          tax?: string | null
          TaxID?: number | null
          Title?: string | null
          type?: string | null
          types?: Json | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          allowed_on_expense?: string | null
          allowed_on_material?: string | null
          allowed_on_service?: string | null
          code?: string | null
          cost?: string | null
          cost_ledger?: string | null
          cost_ledger_id?: string | null
          cost_rate_id?: string | null
          cost_tax?: string | null
          cost_tax_id?: string | null
          description?: string | null
          expense_type_ledger?: string | null
          ID?: number
          IsDeleted?: boolean
          LedgerID?: number | null
          line_item_ledger?: string | null
          MirrorRemoteID?: number
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          price?: string | null
          price_rate_id?: string | null
          quantity?: string | null
          RawPayload?: Json | null
          RemoteID?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          tax?: string | null
          TaxID?: number | null
          Title?: string | null
          type?: string | null
          types?: Json | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Filter: {
        Row: {
          filters: Json | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          ObjectType: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          Shared: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          staff: string | null
          StaffID: number | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          filters?: Json | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          ObjectType?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          Shared?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          staff?: string | null
          StaffID?: number | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          filters?: Json | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          ObjectType?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          Shared?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          staff?: string | null
          StaffID?: number | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_filter_staff"
            columns: ["StaffID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
        ]
      }
      Group: {
        Row: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          ParentID: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          ParentID?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          ParentID?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Holiday: {
        Row: {
          against_id: string | null
          against_type: string | null
          date_end: string | null
          date_start: string | null
          duration_seconds: string | null
          id: string
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          staff: string | null
          staff_id: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          against_id?: string | null
          against_type?: string | null
          date_end?: string | null
          date_start?: string | null
          duration_seconds?: string | null
          id: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          staff?: string | null
          staff_id?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          against_id?: string | null
          against_type?: string | null
          date_end?: string | null
          date_start?: string | null
          duration_seconds?: string | null
          id?: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          staff?: string | null
          staff_id?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Invoice: {
        Row: {
          Affiliation: number | null
          AffiliationContact: number | null
          AffiliationID: number | null
          AgainstID: number | null
          AgainstType: string | null
          Amount: number
          CompanyID: number | null
          contact: string | null
          created_by: string | null
          CreatorID: number | null
          CurrencyID: number | null
          DateDue: number | null
          DateModified: number | null
          DateRaised: number | null
          ID: number
          InvoiceNumber: string | null
          IsDeleted: boolean
          JobID: number | null
          MirrorRemoteID: number
          ModifiedBy: number | null
          Notes: string | null
          Outstanding: number | null
          OwnerID: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          Subject: string | null
          Tax: number | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Affiliation?: number | null
          AffiliationContact?: number | null
          AffiliationID?: number | null
          AgainstID?: number | null
          AgainstType?: string | null
          Amount: number
          CompanyID?: number | null
          contact?: string | null
          created_by?: string | null
          CreatorID?: number | null
          CurrencyID?: number | null
          DateDue?: number | null
          DateModified?: number | null
          DateRaised?: number | null
          ID: number
          InvoiceNumber?: string | null
          IsDeleted: boolean
          JobID?: number | null
          MirrorRemoteID: number
          ModifiedBy?: number | null
          Notes?: string | null
          Outstanding?: number | null
          OwnerID?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Subject?: string | null
          Tax?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Affiliation?: number | null
          AffiliationContact?: number | null
          AffiliationID?: number | null
          AgainstID?: number | null
          AgainstType?: string | null
          Amount?: number
          CompanyID?: number | null
          contact?: string | null
          created_by?: string | null
          CreatorID?: number | null
          CurrencyID?: number | null
          DateDue?: number | null
          DateModified?: number | null
          DateRaised?: number | null
          ID?: number
          InvoiceNumber?: string | null
          IsDeleted?: boolean
          JobID?: number | null
          MirrorRemoteID?: number
          ModifiedBy?: number | null
          Notes?: string | null
          Outstanding?: number | null
          OwnerID?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Subject?: string | null
          Tax?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_invoice_affiliation"
            columns: ["Affiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_invoice_affiliation_id"
            columns: ["AffiliationID"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_invoice_company"
            columns: ["CompanyID"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_invoice_creator"
            columns: ["CreatorID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_invoice_job"
            columns: ["JobID"]
            isOneToOne: false
            referencedRelation: "Job"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_invoice_modified_by"
            columns: ["ModifiedBy"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_invoice_owner"
            columns: ["OwnerID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
        ]
      }
      InvoiceLineItem: {
        Row: {
          description: string | null
          id: string
          invoice_id: string | null
          IsDeleted: boolean | null
          ledger_id: string | null
          line_item_ledger: string | null
          line_item_tax: string | null
          ordering: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          quantity: string | null
          rate: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          tax: string | null
          tax_id: string | null
          total: string | null
          type: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          description?: string | null
          id: string
          invoice_id?: string | null
          IsDeleted?: boolean | null
          ledger_id?: string | null
          line_item_ledger?: string | null
          line_item_tax?: string | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          quantity?: string | null
          rate?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          tax?: string | null
          tax_id?: string | null
          total?: string | null
          type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          invoice_id?: string | null
          IsDeleted?: boolean | null
          ledger_id?: string | null
          line_item_ledger?: string | null
          line_item_tax?: string | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          quantity?: string | null
          rate?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          tax?: string | null
          tax_id?: string | null
          total?: string | null
          type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      InvoiceProfileField: {
        Row: {
          confidential: string | null
          description: string | null
          exported: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_type: string | null
          lookup_type: string | null
          parent_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          required: string | null
          restrictions: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      InvoiceProfileValue: {
        Row: {
          date_modified: string | null
          field_id: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_id: string | null
          link_type: string | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          value: string | null
          value_id: string | null
          value_type: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Issue: {
        Row: {
          Affiliation: number | null
          against: string | null
          AgainstID: number | null
          AgainstType: string | null
          Assignee: number | null
          BillableSeconds: number | null
          Class: number | null
          ClosedBy: number | null
          Company: number | null
          CompanyID: number | null
          contact: string | null
          Contract: number | null
          CustomID: string | null
          date_started: string | null
          DateClosed: number | null
          DateCreated: number | null
          DateDue: number | null
          DateLastInteracted: number | null
          DateModified: number | null
          DateOpened: number | null
          DateResolved: number | null
          DateSubmitted: number | null
          Description: string | null
          ID: number
          IsDeleted: boolean
          issue_status: string | null
          IssueObjectBudget: number | null
          IssuePriority: number | null
          IssueType: number | null
          MirrorRemoteID: number
          object_budget: string | null
          OpenedBy: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          priority: string | null
          RawPayload: Json | null
          ReferrerID: number | null
          ReferrerType: string | null
          RemoteID: string
          Resolution: number | null
          ResolutionDetail: string | null
          ResolvedBy: number | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          StaffBookmarked: boolean | null
          Standing: string | null
          status: string | null
          StatusID: number | null
          SubmittedBy: number | null
          Title: string | null
          type: string | null
          WhenClosed: string | null
          WhenCreated: string | null
          WhenDue: string | null
          WhenLastInteracted: string | null
          WhenModified: string | null
          WhenOpened: string | null
          WhenResolved: string | null
          WhenSubmitted: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Affiliation?: number | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          Assignee?: number | null
          BillableSeconds?: number | null
          Class?: number | null
          ClosedBy?: number | null
          Company?: number | null
          CompanyID?: number | null
          contact?: string | null
          Contract?: number | null
          CustomID?: string | null
          date_started?: string | null
          DateClosed?: number | null
          DateCreated?: number | null
          DateDue?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          DateOpened?: number | null
          DateResolved?: number | null
          DateSubmitted?: number | null
          Description?: string | null
          ID: number
          IsDeleted: boolean
          issue_status?: string | null
          IssueObjectBudget?: number | null
          IssuePriority?: number | null
          IssueType?: number | null
          MirrorRemoteID: number
          object_budget?: string | null
          OpenedBy?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          priority?: string | null
          RawPayload?: Json | null
          ReferrerID?: number | null
          ReferrerType?: string | null
          RemoteID: string
          Resolution?: number | null
          ResolutionDetail?: string | null
          ResolvedBy?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          SubmittedBy?: number | null
          Title?: string | null
          type?: string | null
          WhenClosed?: string | null
          WhenCreated?: string | null
          WhenDue?: string | null
          WhenLastInteracted?: string | null
          WhenModified?: string | null
          WhenOpened?: string | null
          WhenResolved?: string | null
          WhenSubmitted?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Affiliation?: number | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          Assignee?: number | null
          BillableSeconds?: number | null
          Class?: number | null
          ClosedBy?: number | null
          Company?: number | null
          CompanyID?: number | null
          contact?: string | null
          Contract?: number | null
          CustomID?: string | null
          date_started?: string | null
          DateClosed?: number | null
          DateCreated?: number | null
          DateDue?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          DateOpened?: number | null
          DateResolved?: number | null
          DateSubmitted?: number | null
          Description?: string | null
          ID?: number
          IsDeleted?: boolean
          issue_status?: string | null
          IssueObjectBudget?: number | null
          IssuePriority?: number | null
          IssueType?: number | null
          MirrorRemoteID?: number
          object_budget?: string | null
          OpenedBy?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          priority?: string | null
          RawPayload?: Json | null
          ReferrerID?: number | null
          ReferrerType?: string | null
          RemoteID?: string
          Resolution?: number | null
          ResolutionDetail?: string | null
          ResolvedBy?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          SubmittedBy?: number | null
          Title?: string | null
          type?: string | null
          WhenClosed?: string | null
          WhenCreated?: string | null
          WhenDue?: string | null
          WhenLastInteracted?: string | null
          WhenModified?: string | null
          WhenOpened?: string | null
          WhenResolved?: string | null
          WhenSubmitted?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_issue_affiliation"
            columns: ["Affiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_issue_assignee"
            columns: ["Assignee"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_issue_closed_by"
            columns: ["ClosedBy"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_issue_company"
            columns: ["Company"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_issue_company_id"
            columns: ["CompanyID"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_issue_contract"
            columns: ["Contract"]
            isOneToOne: false
            referencedRelation: "Contract"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_issue_opened_by"
            columns: ["OpenedBy"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_issue_resolved_by"
            columns: ["ResolvedBy"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_issue_status"
            columns: ["StatusID"]
            isOneToOne: false
            referencedRelation: "IssueStatus"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_issue_submitted_by"
            columns: ["SubmittedBy"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
        ]
      }
      IssueClass: {
        Row: {
          description: string | null
          id: string
          IsDeleted: boolean | null
          parent: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          product: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          status: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          description?: string | null
          id: string
          IsDeleted?: boolean | null
          parent?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          product?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          status?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          IsDeleted?: boolean | null
          parent?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          product?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          status?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      IssueCustomField: {
        Row: {
          FieldName: string | null
          FieldType: string | null
          ID: number
          IsDeleted: boolean
          LinkTypeID: number
          MirrorRemoteID: number
          RemoteID: string
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          FieldName?: string | null
          FieldType?: string | null
          ID: number
          IsDeleted: boolean
          LinkTypeID: number
          MirrorRemoteID: number
          RemoteID: string
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          FieldName?: string | null
          FieldType?: string | null
          ID?: number
          IsDeleted?: boolean
          LinkTypeID?: number
          MirrorRemoteID?: number
          RemoteID?: string
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      IssueCustomFieldOption: {
        Row: {
          CustomFieldID: number
          IsDeleted: boolean
          IssueCustomFieldRemoteID: string | null
          LineNumber: number
          MirrorRemoteID: number
          RemoteID: string
          Value: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          CustomFieldID: number
          IsDeleted: boolean
          IssueCustomFieldRemoteID?: string | null
          LineNumber: number
          MirrorRemoteID: number
          RemoteID: string
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          CustomFieldID?: number
          IsDeleted?: boolean
          IssueCustomFieldRemoteID?: string | null
          LineNumber?: number
          MirrorRemoteID?: number
          RemoteID?: string
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_issue_custom_field_option_field"
            columns: ["CustomFieldID"]
            isOneToOne: false
            referencedRelation: "IssueCustomField"
            referencedColumns: ["ID"]
          },
        ]
      }
      IssuePriority: {
        Row: {
          color: string | null
          factor: string | null
          icon: string | null
          id: string
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          target: string | null
          title: string | null
          unit: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          color?: string | null
          factor?: string | null
          icon?: string | null
          id: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          target?: string | null
          title?: string | null
          unit?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          color?: string | null
          factor?: string | null
          icon?: string | null
          id?: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          target?: string | null
          title?: string | null
          unit?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      IssueProfileField: {
        Row: {
          confidential: string | null
          description: string | null
          exported: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_type: string | null
          lookup_type: string | null
          options: Json | null
          parent_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          required: string | null
          restrictions: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      IssueProfileValue: {
        Row: {
          date_modified: string | null
          field_id: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_id: string | null
          link_type: string | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          value: string | null
          value_id: string | null
          value_type: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      IssueResolution: {
        Row: {
          ID: number
          IsDeleted: boolean | null
          MirrorRemoteID: number | null
          RemoteID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      IssueStatus: {
        Row: {
          Color: string | null
          ID: number
          IsDeleted: boolean
          IssueRemoteID: string | null
          MirrorRemoteID: number
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          start: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Color?: string | null
          ID: number
          IsDeleted: boolean
          IssueRemoteID?: string | null
          MirrorRemoteID: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Color?: string | null
          ID?: number
          IsDeleted?: boolean
          IssueRemoteID?: string | null
          MirrorRemoteID?: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      IssueType: {
        Row: {
          budget: string | null
          default_class_id: string | null
          default_issue_class: string | null
          default_issue_priority: string | null
          has_custom_id: string | null
          id: string
          IsDeleted: boolean | null
          notes: string | null
          ordering: string | null
          parent: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          budget?: string | null
          default_class_id?: string | null
          default_issue_class?: string | null
          default_issue_priority?: string | null
          has_custom_id?: string | null
          id: string
          IsDeleted?: boolean | null
          notes?: string | null
          ordering?: string | null
          parent?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          budget?: string | null
          default_class_id?: string | null
          default_issue_class?: string | null
          default_issue_priority?: string | null
          has_custom_id?: string | null
          id?: string
          IsDeleted?: boolean | null
          notes?: string | null
          ordering?: string | null
          parent?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Job: {
        Row: {
          Affiliation: number | null
          against: string | null
          AgainstID: number | null
          AgainstType: string | null
          comments: string | null
          Company: number | null
          CustomID: string | null
          DateCommenced: number | null
          DateCompleted: number | null
          DateCreated: number | null
          DateDue: number | null
          DateLastInteracted: number | null
          DateModified: number | null
          DateStarted: number | null
          ID: number
          IsDeleted: boolean
          job_status: string | null
          job_type: string | null
          JobContract: number | null
          JobObjectBudget: number | null
          JobObjectSchedule: number | null
          JobTypeID: number | null
          Manager: number | null
          MirrorRemoteID: number
          ModifiedBy: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          Paused: number | null
          Rate: number | null
          rate_charged: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          StaffBookmarked: boolean | null
          Standing: string | null
          status: string | null
          StatusID: number | null
          Title: string | null
          Type: number | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Affiliation?: number | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          comments?: string | null
          Company?: number | null
          CustomID?: string | null
          DateCommenced?: number | null
          DateCompleted?: number | null
          DateCreated?: number | null
          DateDue?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          DateStarted?: number | null
          ID: number
          IsDeleted: boolean
          job_status?: string | null
          job_type?: string | null
          JobContract?: number | null
          JobObjectBudget?: number | null
          JobObjectSchedule?: number | null
          JobTypeID?: number | null
          Manager?: number | null
          MirrorRemoteID: number
          ModifiedBy?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Paused?: number | null
          Rate?: number | null
          rate_charged?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          Title?: string | null
          Type?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Affiliation?: number | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          comments?: string | null
          Company?: number | null
          CustomID?: string | null
          DateCommenced?: number | null
          DateCompleted?: number | null
          DateCreated?: number | null
          DateDue?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          DateStarted?: number | null
          ID?: number
          IsDeleted?: boolean
          job_status?: string | null
          job_type?: string | null
          JobContract?: number | null
          JobObjectBudget?: number | null
          JobObjectSchedule?: number | null
          JobTypeID?: number | null
          Manager?: number | null
          MirrorRemoteID?: number
          ModifiedBy?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Paused?: number | null
          Rate?: number | null
          rate_charged?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          Title?: string | null
          Type?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_job_affiliation"
            columns: ["Affiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_job_company"
            columns: ["Company"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_job_manager"
            columns: ["Manager"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_job_modified_by"
            columns: ["ModifiedBy"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_job_rate"
            columns: ["Rate"]
            isOneToOne: false
            referencedRelation: "Rate"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_job_status"
            columns: ["StatusID"]
            isOneToOne: false
            referencedRelation: "JobStatus"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_job_type"
            columns: ["JobTypeID"]
            isOneToOne: false
            referencedRelation: "JobType"
            referencedColumns: ["ID"]
          },
        ]
      }
      JobCustomField: {
        Row: {
          FieldName: string | null
          FieldType: string | null
          ID: number
          IsDeleted: boolean
          LinkTypeID: number
          MirrorRemoteID: number
          RemoteID: string
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          FieldName?: string | null
          FieldType?: string | null
          ID: number
          IsDeleted: boolean
          LinkTypeID: number
          MirrorRemoteID: number
          RemoteID: string
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          FieldName?: string | null
          FieldType?: string | null
          ID?: number
          IsDeleted?: boolean
          LinkTypeID?: number
          MirrorRemoteID?: number
          RemoteID?: string
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      JobCustomFieldOption: {
        Row: {
          CustomFieldID: number
          IsDeleted: boolean
          JobCustomFieldRemoteID: string | null
          LineNumber: number
          MirrorRemoteID: number
          RemoteID: string
          Value: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          CustomFieldID: number
          IsDeleted: boolean
          JobCustomFieldRemoteID?: string | null
          LineNumber: number
          MirrorRemoteID: number
          RemoteID: string
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          CustomFieldID?: number
          IsDeleted?: boolean
          JobCustomFieldRemoteID?: string | null
          LineNumber?: number
          MirrorRemoteID?: number
          RemoteID?: string
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_job_custom_field_option_field"
            columns: ["CustomFieldID"]
            isOneToOne: false
            referencedRelation: "JobCustomField"
            referencedColumns: ["ID"]
          },
        ]
      }
      JobProfileField: {
        Row: {
          Confidential: string | null
          Description: string | null
          Exported: string | null
          FieldName: string | null
          FieldType: string | null
          ID: number
          IsDeleted: boolean
          LinkType: string | null
          LookupType: string | null
          MirrorRemoteID: number
          options: Json | null
          ParentID: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          Required: string | null
          Restrictions: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Confidential?: string | null
          Description?: string | null
          Exported?: string | null
          FieldName?: string | null
          FieldType?: string | null
          ID: number
          IsDeleted: boolean
          LinkType?: string | null
          LookupType?: string | null
          MirrorRemoteID: number
          options?: Json | null
          ParentID?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          Required?: string | null
          Restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Confidential?: string | null
          Description?: string | null
          Exported?: string | null
          FieldName?: string | null
          FieldType?: string | null
          ID?: number
          IsDeleted?: boolean
          LinkType?: string | null
          LookupType?: string | null
          MirrorRemoteID?: number
          options?: Json | null
          ParentID?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          Required?: string | null
          Restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      JobProfileValue: {
        Row: {
          date_modified: string | null
          field_id: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_id: string | null
          link_type: string | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          value: string | null
          value_type: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      JobStatus: {
        Row: {
          Color: string | null
          ID: number
          IsDeleted: boolean
          JobRemoteID: string | null
          MirrorRemoteID: number
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          start: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Color?: string | null
          ID: number
          IsDeleted: boolean
          JobRemoteID?: string | null
          MirrorRemoteID: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Color?: string | null
          ID?: number
          IsDeleted?: boolean
          JobRemoteID?: string | null
          MirrorRemoteID?: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      JobType: {
        Row: {
          has_custom_id: string | null
          ID: number
          IsDeleted: boolean
          JobRemoteID: string | null
          MirrorRemoteID: number
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          has_custom_id?: string | null
          ID: number
          IsDeleted: boolean
          JobRemoteID?: string | null
          MirrorRemoteID: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          has_custom_id?: string | null
          ID?: number
          IsDeleted?: boolean
          JobRemoteID?: string | null
          MirrorRemoteID?: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Ledger: {
        Row: {
          code: string | null
          comment: string | null
          id: string
          IsDeleted: boolean | null
          parent_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          code?: string | null
          comment?: string | null
          id: string
          IsDeleted?: boolean | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          code?: string | null
          comment?: string | null
          id?: string
          IsDeleted?: boolean | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Milestone: {
        Row: {
          DateCommenced: number | null
          DateCompleted: number | null
          DateCreated: string | null
          DateDue: number | null
          DateModified: string | null
          DateStarted: number | null
          Description: string | null
          ID: number
          IsDeleted: boolean
          Job: number | null
          Manager: number | null
          milestone_object_schedule: string | null
          milestone_status: string | null
          MilestoneObjectBudget: number | null
          MirrorRemoteID: number
          object_budget: string | null
          ordering: string | null
          Parent: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          Rate: number | null
          RateCharged: number | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          Status: number | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          DateCommenced?: number | null
          DateCompleted?: number | null
          DateCreated?: string | null
          DateDue?: number | null
          DateModified?: string | null
          DateStarted?: number | null
          Description?: string | null
          ID: number
          IsDeleted: boolean
          Job?: number | null
          Manager?: number | null
          milestone_object_schedule?: string | null
          milestone_status?: string | null
          MilestoneObjectBudget?: number | null
          MirrorRemoteID: number
          object_budget?: string | null
          ordering?: string | null
          Parent?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Rate?: number | null
          RateCharged?: number | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Status?: number | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          DateCommenced?: number | null
          DateCompleted?: number | null
          DateCreated?: string | null
          DateDue?: number | null
          DateModified?: string | null
          DateStarted?: number | null
          Description?: string | null
          ID?: number
          IsDeleted?: boolean
          Job?: number | null
          Manager?: number | null
          milestone_object_schedule?: string | null
          milestone_status?: string | null
          MilestoneObjectBudget?: number | null
          MirrorRemoteID?: number
          object_budget?: string | null
          ordering?: string | null
          Parent?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Rate?: number | null
          RateCharged?: number | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Status?: number | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_milestone_job"
            columns: ["Job"]
            isOneToOne: false
            referencedRelation: "Job"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_milestone_manager"
            columns: ["Manager"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_milestone_rate"
            columns: ["Rate"]
            isOneToOne: false
            referencedRelation: "Rate"
            referencedColumns: ["ID"]
          },
        ]
      }
      MilestoneProfileField: {
        Row: {
          confidential: string | null
          description: string | null
          exported: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_type: string | null
          lookup_type: string | null
          options: Json | null
          parent_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          required: string | null
          restrictions: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      MilestoneProfileValue: {
        Row: {
          date_modified: string | null
          field_id: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_id: string | null
          link_type: string | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          value: string | null
          value_id: string | null
          value_type: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_id?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      MilestoneStatus: {
        Row: {
          color: string | null
          id: string
          IsDeleted: boolean | null
          ordering: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          color?: string | null
          id: string
          IsDeleted?: boolean | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          color?: string | null
          id?: string
          IsDeleted?: boolean | null
          ordering?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ObjectBudget: {
        Row: {
          AgainstID: number | null
          AgainstType: string | null
          Billable: number | null
          BillableSubtotal: number | null
          Charged: number | null
          ChargedSubtotal: number | null
          ExpensePrice: number | null
          ID: number
          IsBillable: string | null
          IsDeleted: boolean
          JobID: number | null
          Logged: number | null
          LoggedSubtotal: number | null
          MaterialCost: number | null
          MaterialCostSubtotal: number | null
          MaterialPrice: number | null
          MaterialPriceSubtotal: number | null
          MilestoneID: number | null
          MirrorRemoteID: number
          Nonbillable: number | null
          NonbillableSubtotal: number | null
          object_id: string | null
          object_table: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemainingSubtotal: number | null
          RemoteID: string
          ServicePrice: number | null
          ServicePriceEstimate: number | null
          ServicePriceSubtotal: number | null
          ServicePriceSubtotalEstimate: number | null
          ServiceTime: number | null
          ServiceTimeEstimate: number | null
          ServiceTimeSubtotalEstimate: number | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          TaskID: number | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          AgainstID?: number | null
          AgainstType?: string | null
          Billable?: number | null
          BillableSubtotal?: number | null
          Charged?: number | null
          ChargedSubtotal?: number | null
          ExpensePrice?: number | null
          ID: number
          IsBillable?: string | null
          IsDeleted: boolean
          JobID?: number | null
          Logged?: number | null
          LoggedSubtotal?: number | null
          MaterialCost?: number | null
          MaterialCostSubtotal?: number | null
          MaterialPrice?: number | null
          MaterialPriceSubtotal?: number | null
          MilestoneID?: number | null
          MirrorRemoteID: number
          Nonbillable?: number | null
          NonbillableSubtotal?: number | null
          object_id?: string | null
          object_table?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemainingSubtotal?: number | null
          RemoteID: string
          ServicePrice?: number | null
          ServicePriceEstimate?: number | null
          ServicePriceSubtotal?: number | null
          ServicePriceSubtotalEstimate?: number | null
          ServiceTime?: number | null
          ServiceTimeEstimate?: number | null
          ServiceTimeSubtotalEstimate?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          TaskID?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          AgainstID?: number | null
          AgainstType?: string | null
          Billable?: number | null
          BillableSubtotal?: number | null
          Charged?: number | null
          ChargedSubtotal?: number | null
          ExpensePrice?: number | null
          ID?: number
          IsBillable?: string | null
          IsDeleted?: boolean
          JobID?: number | null
          Logged?: number | null
          LoggedSubtotal?: number | null
          MaterialCost?: number | null
          MaterialCostSubtotal?: number | null
          MaterialPrice?: number | null
          MaterialPriceSubtotal?: number | null
          MilestoneID?: number | null
          MirrorRemoteID?: number
          Nonbillable?: number | null
          NonbillableSubtotal?: number | null
          object_id?: string | null
          object_table?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemainingSubtotal?: number | null
          RemoteID?: string
          ServicePrice?: number | null
          ServicePriceEstimate?: number | null
          ServicePriceSubtotal?: number | null
          ServicePriceSubtotalEstimate?: number | null
          ServiceTime?: number | null
          ServiceTimeEstimate?: number | null
          ServiceTimeSubtotalEstimate?: number | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          TaskID?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_object_budget_job"
            columns: ["JobID"]
            isOneToOne: false
            referencedRelation: "Job"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_object_budget_milestone"
            columns: ["MilestoneID"]
            isOneToOne: false
            referencedRelation: "Milestone"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_object_budget_task"
            columns: ["TaskID"]
            isOneToOne: false
            referencedRelation: "Task"
            referencedColumns: ["ID"]
          },
        ]
      }
      Payment: {
        Row: {
          AgainstID: number | null
          AgainstType: string | null
          Amount: number | null
          CreatedByStaffID: number | null
          CurrencyID: number | null
          DateCreated: string | null
          Direction: string | null
          ID: number
          InvoiceID: number | null
          IsDeleted: boolean
          MethodID: number | null
          MirrorRemoteID: number
          ParentRecordID: string | null
          ParentTable: string | null
          payment_currency: string | null
          payment_method: string | null
          payment_receipt: string | null
          PurchaseID: number | null
          RawPayload: Json | null
          ReceiptID: number | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          AgainstID?: number | null
          AgainstType?: string | null
          Amount?: number | null
          CreatedByStaffID?: number | null
          CurrencyID?: number | null
          DateCreated?: string | null
          Direction?: string | null
          ID: number
          InvoiceID?: number | null
          IsDeleted: boolean
          MethodID?: number | null
          MirrorRemoteID: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          payment_currency?: string | null
          payment_method?: string | null
          payment_receipt?: string | null
          PurchaseID?: number | null
          RawPayload?: Json | null
          ReceiptID?: number | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          AgainstID?: number | null
          AgainstType?: string | null
          Amount?: number | null
          CreatedByStaffID?: number | null
          CurrencyID?: number | null
          DateCreated?: string | null
          Direction?: string | null
          ID?: number
          InvoiceID?: number | null
          IsDeleted?: boolean
          MethodID?: number | null
          MirrorRemoteID?: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          payment_currency?: string | null
          payment_method?: string | null
          payment_receipt?: string | null
          PurchaseID?: number | null
          RawPayload?: Json | null
          ReceiptID?: number | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_payment_created_by"
            columns: ["CreatedByStaffID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_payment_invoice"
            columns: ["InvoiceID"]
            isOneToOne: false
            referencedRelation: "Invoice"
            referencedColumns: ["ID"]
          },
        ]
      }
      ProgressionHistory: {
        Row: {
          against_id: string | null
          against_type: string | null
          date_modified: string | null
          id: string
          IsDeleted: boolean | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          to_id: string | null
          to_title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          against_id?: string | null
          against_type?: string | null
          date_modified?: string | null
          id: string
          IsDeleted?: boolean | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          to_id?: string | null
          to_title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          against_id?: string | null
          against_type?: string | null
          date_modified?: string | null
          id?: string
          IsDeleted?: boolean | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          to_id?: string | null
          to_title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Prospect: {
        Row: {
          AbandonedByID: number | null
          Affiliation: number | null
          CancelledByID: number | null
          Comments: string | null
          contact: string | null
          date_abandoned: string | null
          date_cancelled: string | null
          date_lost: string | null
          date_won: string | null
          DateActioned: number | null
          DateCreated: number | null
          DateDue: number | null
          DateLastInteracted: number | null
          DateModified: number | null
          ID: number
          IsDeleted: boolean
          Manager: number | null
          MirrorRemoteID: number
          ParentRecordID: string | null
          ParentTable: string | null
          Progress: number | null
          prospect_probability: string | null
          prospect_status: string | null
          prospect_type: string | null
          ProspectProbabilityID: number | null
          ProspectTypeID: number | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          StaffBookmarked: boolean | null
          Standing: string | null
          status: string | null
          StatusID: number | null
          Success: boolean | null
          Title: string | null
          type: string | null
          Value: number | null
          ValueWeighted: number | null
          Weighting: number | null
          WhenActioned: string | null
          WhenCreated: string | null
          WhenDue: string | null
          WhenLastInteracted: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
          WonByID: number | null
        }
        Insert: {
          AbandonedByID?: number | null
          Affiliation?: number | null
          CancelledByID?: number | null
          Comments?: string | null
          contact?: string | null
          date_abandoned?: string | null
          date_cancelled?: string | null
          date_lost?: string | null
          date_won?: string | null
          DateActioned?: number | null
          DateCreated?: number | null
          DateDue?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          ID: number
          IsDeleted: boolean
          Manager?: number | null
          MirrorRemoteID: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          Progress?: number | null
          prospect_probability?: string | null
          prospect_status?: string | null
          prospect_type?: string | null
          ProspectProbabilityID?: number | null
          ProspectTypeID?: number | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          Success?: boolean | null
          Title?: string | null
          type?: string | null
          Value?: number | null
          ValueWeighted?: number | null
          Weighting?: number | null
          WhenActioned?: string | null
          WhenCreated?: string | null
          WhenDue?: string | null
          WhenLastInteracted?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
          WonByID?: number | null
        }
        Update: {
          AbandonedByID?: number | null
          Affiliation?: number | null
          CancelledByID?: number | null
          Comments?: string | null
          contact?: string | null
          date_abandoned?: string | null
          date_cancelled?: string | null
          date_lost?: string | null
          date_won?: string | null
          DateActioned?: number | null
          DateCreated?: number | null
          DateDue?: number | null
          DateLastInteracted?: number | null
          DateModified?: number | null
          ID?: number
          IsDeleted?: boolean
          Manager?: number | null
          MirrorRemoteID?: number
          ParentRecordID?: string | null
          ParentTable?: string | null
          Progress?: number | null
          prospect_probability?: string | null
          prospect_status?: string | null
          prospect_type?: string | null
          ProspectProbabilityID?: number | null
          ProspectTypeID?: number | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          Success?: boolean | null
          Title?: string | null
          type?: string | null
          Value?: number | null
          ValueWeighted?: number | null
          Weighting?: number | null
          WhenActioned?: string | null
          WhenCreated?: string | null
          WhenDue?: string | null
          WhenLastInteracted?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
          WonByID?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_prospect_abandoned_by"
            columns: ["AbandonedByID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_prospect_affiliation"
            columns: ["Affiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_prospect_cancelled_by"
            columns: ["CancelledByID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_prospect_manager"
            columns: ["Manager"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_prospect_probability"
            columns: ["ProspectProbabilityID"]
            isOneToOne: false
            referencedRelation: "ProspectProbability"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_prospect_status"
            columns: ["StatusID"]
            isOneToOne: false
            referencedRelation: "ProspectStatus"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_prospect_type"
            columns: ["ProspectTypeID"]
            isOneToOne: false
            referencedRelation: "ProspectType"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_prospect_won_by"
            columns: ["WonByID"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
        ]
      }
      ProspectCustomField: {
        Row: {
          FieldName: string | null
          FieldType: string | null
          ID: number
          IsDeleted: boolean
          LinkTypeID: number
          MirrorRemoteID: number
          RemoteID: string
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          FieldName?: string | null
          FieldType?: string | null
          ID: number
          IsDeleted: boolean
          LinkTypeID: number
          MirrorRemoteID: number
          RemoteID: string
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          FieldName?: string | null
          FieldType?: string | null
          ID?: number
          IsDeleted?: boolean
          LinkTypeID?: number
          MirrorRemoteID?: number
          RemoteID?: string
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ProspectCustomFieldOption: {
        Row: {
          CustomFieldID: number
          IsDeleted: boolean
          LineNumber: number
          MirrorRemoteID: number
          ProspectCustomFieldRemoteID: string | null
          RemoteID: string
          Value: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          CustomFieldID: number
          IsDeleted: boolean
          LineNumber: number
          MirrorRemoteID: number
          ProspectCustomFieldRemoteID?: string | null
          RemoteID: string
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          CustomFieldID?: number
          IsDeleted?: boolean
          LineNumber?: number
          MirrorRemoteID?: number
          ProspectCustomFieldRemoteID?: string | null
          RemoteID?: string
          Value?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_prospect_custom_field_option_field"
            columns: ["CustomFieldID"]
            isOneToOne: false
            referencedRelation: "ProspectCustomField"
            referencedColumns: ["ID"]
          },
        ]
      }
      ProspectProbability: {
        Row: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          ProspectRemoteID: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Title: string | null
          Value: number | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          ProspectRemoteID?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Title?: string | null
          Value?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          ProspectRemoteID?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Title?: string | null
          Value?: number | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ProspectProfileField: {
        Row: {
          confidential: string | null
          description: string | null
          exported: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_type: string | null
          lookup_type: string | null
          options: Json | null
          parent_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          required: string | null
          restrictions: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          options?: Json | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ProspectProfileValue: {
        Row: {
          date_modified: string | null
          field_id: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_id: string | null
          link_type: string | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          value: string | null
          value_type: string | null
          values: Json | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_type?: string | null
          values?: Json | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_type?: string | null
          values?: Json | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ProspectStatus: {
        Row: {
          Color: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          ProspectRemoteID: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          start: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Color?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          ProspectRemoteID?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Color?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          ProspectRemoteID?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          start?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      ProspectType: {
        Row: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering: number | null
          Parent: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          ProspectRemoteID: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering?: number | null
          Parent?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          ProspectRemoteID?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Ordering?: number | null
          Parent?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          ProspectRemoteID?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Purchase: {
        Row: {
          affiliation_id: string | null
          amount: string | null
          creator_id: string | null
          date_purchased: string | null
          id: string
          IsDeleted: boolean | null
          owner_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          tax: string | null
          title: string | null
          total: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          affiliation_id?: string | null
          amount?: string | null
          creator_id?: string | null
          date_purchased?: string | null
          id: string
          IsDeleted?: boolean | null
          owner_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          tax?: string | null
          title?: string | null
          total?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          affiliation_id?: string | null
          amount?: string | null
          creator_id?: string | null
          date_purchased?: string | null
          id?: string
          IsDeleted?: boolean | null
          owner_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          tax?: string | null
          title?: string | null
          total?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      PurchaseProfileField: {
        Row: {
          ID: number
          IsDeleted: boolean | null
          MirrorRemoteID: number | null
          RemoteID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      PurchaseProfileValue: {
        Row: {
          ID: number
          IsDeleted: boolean | null
          MirrorRemoteID: number | null
          RemoteID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Quote: {
        Row: {
          affiliation: string | null
          affiliation_id: string | null
          against: string | null
          against_id: string | null
          against_type: string | null
          conclusion: string | null
          contact: string | null
          created_by: string | null
          created_by_staff_id: string | null
          date_created: string | null
          date_expiry: string | null
          date_modified: string | null
          id: string
          introduction: string | null
          IsDeleted: boolean | null
          manager: string | null
          manager_id: string | null
          material_price_total: string | null
          notes: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          portal_access: string | null
          quote_status: string | null
          RawPayload: Json | null
          service_price_total: string | null
          service_time_total: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          status: string | null
          status_id: string | null
          terms: string | null
          title: string | null
          total_price: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          affiliation?: string | null
          affiliation_id?: string | null
          against?: string | null
          against_id?: string | null
          against_type?: string | null
          conclusion?: string | null
          contact?: string | null
          created_by?: string | null
          created_by_staff_id?: string | null
          date_created?: string | null
          date_expiry?: string | null
          date_modified?: string | null
          id: string
          introduction?: string | null
          IsDeleted?: boolean | null
          manager?: string | null
          manager_id?: string | null
          material_price_total?: string | null
          notes?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          portal_access?: string | null
          quote_status?: string | null
          RawPayload?: Json | null
          service_price_total?: string | null
          service_time_total?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          status?: string | null
          status_id?: string | null
          terms?: string | null
          title?: string | null
          total_price?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          affiliation?: string | null
          affiliation_id?: string | null
          against?: string | null
          against_id?: string | null
          against_type?: string | null
          conclusion?: string | null
          contact?: string | null
          created_by?: string | null
          created_by_staff_id?: string | null
          date_created?: string | null
          date_expiry?: string | null
          date_modified?: string | null
          id?: string
          introduction?: string | null
          IsDeleted?: boolean | null
          manager?: string | null
          manager_id?: string | null
          material_price_total?: string | null
          notes?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          portal_access?: string | null
          quote_status?: string | null
          RawPayload?: Json | null
          service_price_total?: string | null
          service_time_total?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          status?: string | null
          status_id?: string | null
          terms?: string | null
          title?: string | null
          total_price?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      QuoteStatus: {
        Row: {
          color: string | null
          id: string
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          color?: string | null
          id: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          color?: string | null
          id?: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Rate: {
        Row: {
          Charged: number
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Object: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Charged: number
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Object?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Charged?: number
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Object?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Referral: {
        Row: {
          against_id: string | null
          against_type: string | null
          created_by: string | null
          date_created: string | null
          date_updated: string | null
          id: string
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          referrer_id: string | null
          referrer_type: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          updated_by: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          against_id?: string | null
          against_type?: string | null
          created_by?: string | null
          date_created?: string | null
          date_updated?: string | null
          id: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          referrer_id?: string | null
          referrer_type?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          updated_by?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          against_id?: string | null
          against_type?: string | null
          created_by?: string | null
          date_created?: string | null
          date_updated?: string | null
          id?: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          referrer_id?: string | null
          referrer_type?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          updated_by?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Request: {
        Row: {
          ID: number
          IsDeleted: boolean | null
          MirrorRemoteID: number | null
          RemoteID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      RequestType: {
        Row: {
          id: string | null
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          request_types: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          status: string | null
          subscribed: number | null
          title: string | null
          unresolved_count: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          id?: string | null
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          request_types?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          status?: string | null
          subscribed?: number | null
          title?: string | null
          unresolved_count?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          id?: string | null
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          request_types?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          status?: string | null
          subscribed?: number | null
          title?: string | null
          unresolved_count?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Resource: {
        Row: {
          collection_id: string | null
          date_created: string | null
          filesize: string | null
          id: string
          IsDeleted: boolean | null
          mimetype: string | null
          owner: Json | null
          owner_id: string | null
          owner_type: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          collection_id?: string | null
          date_created?: string | null
          filesize?: string | null
          id: string
          IsDeleted?: boolean | null
          mimetype?: string | null
          owner?: Json | null
          owner_id?: string | null
          owner_type?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          collection_id?: string | null
          date_created?: string | null
          filesize?: string | null
          id?: string
          IsDeleted?: boolean | null
          mimetype?: string | null
          owner?: Json | null
          owner_id?: string | null
          owner_type?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Segmentation: {
        Row: {
          exclusive: string | null
          id: string
          IsDeleted: boolean | null
          leaf: string | null
          link_type: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          required: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          exclusive?: string | null
          id: string
          IsDeleted?: boolean | null
          leaf?: string | null
          link_type?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          exclusive?: string | null
          id?: string
          IsDeleted?: boolean | null
          leaf?: string | null
          link_type?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Signoff: {
        Row: {
          ID: number
          IsDeleted: boolean | null
          MirrorRemoteID: number | null
          RemoteID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      SignoffAttachment: {
        Row: {
          ID: number
          IsDeleted: boolean | null
          MirrorRemoteID: number | null
          RemoteID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      SignoffRecipient: {
        Row: {
          ID: number
          IsDeleted: boolean | null
          MirrorRemoteID: number | null
          RemoteID: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean | null
          MirrorRemoteID?: number | null
          RemoteID?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Skill: {
        Row: {
          id: string | null
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          skills: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          id?: string | null
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          skills?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          id?: string | null
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          skills?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Staff: {
        Row: {
          access_level: string | null
          Email: string | null
          Fax: string | null
          FinancialLevel: string | null
          firstname: string | null
          Firtname: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Mobile: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          Phone: string | null
          Position: string | null
          RawPayload: Json | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          StaffCostRate: number | null
          StaffRate: number | null
          Standing: string | null
          Surname: string | null
          Timezone: string | null
          Title: string | null
          Username: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          access_level?: string | null
          Email?: string | null
          Fax?: string | null
          FinancialLevel?: string | null
          firstname?: string | null
          Firtname?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Mobile?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Phone?: string | null
          Position?: string | null
          RawPayload?: Json | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffCostRate?: number | null
          StaffRate?: number | null
          Standing?: string | null
          Surname?: string | null
          Timezone?: string | null
          Title?: string | null
          Username?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          access_level?: string | null
          Email?: string | null
          Fax?: string | null
          FinancialLevel?: string | null
          firstname?: string | null
          Firtname?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Mobile?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          Phone?: string | null
          Position?: string | null
          RawPayload?: Json | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffCostRate?: number | null
          StaffRate?: number | null
          Standing?: string | null
          Surname?: string | null
          Timezone?: string | null
          Title?: string | null
          Username?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      StaffProfileField: {
        Row: {
          confidential: string | null
          description: string | null
          exported: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_type: string | null
          lookup_type: string | null
          parent_id: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          required: string | null
          restrictions: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          confidential?: string | null
          description?: string | null
          exported?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_type?: string | null
          lookup_type?: string | null
          parent_id?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          required?: string | null
          restrictions?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      StaffProfileValue: {
        Row: {
          date_modified: string | null
          field_id: string | null
          field_name: string | null
          field_type: string | null
          id: string
          IsDeleted: boolean | null
          link_id: string | null
          link_type: string | null
          modified_by: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          value: string | null
          value_type: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_modified?: string | null
          field_id?: string | null
          field_name?: string | null
          field_type?: string | null
          id?: string
          IsDeleted?: boolean | null
          link_id?: string | null
          link_type?: string | null
          modified_by?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          value?: string | null
          value_type?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      State: {
        Row: {
          Abbreviation: string | null
          AddressRemoteID: string | null
          CountryID: number | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering: number | null
          RemoteID: string
          Timezone: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Abbreviation?: string | null
          AddressRemoteID?: string | null
          CountryID?: number | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering?: number | null
          RemoteID: string
          Timezone?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Abbreviation?: string | null
          AddressRemoteID?: string | null
          CountryID?: number | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Ordering?: number | null
          RemoteID?: string
          Timezone?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_state_country"
            columns: ["CountryID"]
            isOneToOne: false
            referencedRelation: "Country"
            referencedColumns: ["ID"]
          },
        ]
      }
      Tag: {
        Row: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Name: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          tags: Json | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Name?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          tags?: Json | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Name?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          tags?: Json | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Task: {
        Row: {
          Affiliation: number | null
          against: string | null
          AgainstID: number | null
          AgainstType: string | null
          assignee: string | null
          Billable: number | null
          Budgeted: number | null
          Company: number | null
          Contact: number | null
          Creator: number | null
          creator_id: string | null
          CreatorType: string | null
          custom_id: string | null
          date_started: string | null
          DateAccepted: number | null
          DateCommenced: number | null
          DateCompleted: number | null
          DateCreated: number | null
          DateDue: number | null
          DateModified: number | null
          Description: string | null
          ID: number
          IsDeleted: boolean
          Issue: number | null
          job: string | null
          Logged: number | null
          Manager: number | null
          milestone: string | null
          MirrorRemoteID: number
          Nonbillable: number | null
          object_budget: string | null
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RateCharged: number | null
          RateID: number | null
          RawPayload: Json | null
          Remaining: number | null
          RemoteID: string
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          StaffBookmarked: boolean | null
          Standing: string | null
          status: string | null
          StatusID: number | null
          task_object_budget: string | null
          task_priority: string | null
          task_status: string | null
          task_type: string | null
          TaskJob: number | null
          TaskObjectSchedule: number | null
          TaskObjectScheduleID: number | null
          TaskTypeOrdering: number | null
          TaskTypeStanding: string | null
          TaskTypeTitle: string | null
          Title: string | null
          type: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Affiliation?: number | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          assignee?: string | null
          Billable?: number | null
          Budgeted?: number | null
          Company?: number | null
          Contact?: number | null
          Creator?: number | null
          creator_id?: string | null
          CreatorType?: string | null
          custom_id?: string | null
          date_started?: string | null
          DateAccepted?: number | null
          DateCommenced?: number | null
          DateCompleted?: number | null
          DateCreated?: number | null
          DateDue?: number | null
          DateModified?: number | null
          Description?: string | null
          ID: number
          IsDeleted: boolean
          Issue?: number | null
          job?: string | null
          Logged?: number | null
          Manager?: number | null
          milestone?: string | null
          MirrorRemoteID: number
          Nonbillable?: number | null
          object_budget?: string | null
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RateCharged?: number | null
          RateID?: number | null
          RawPayload?: Json | null
          Remaining?: number | null
          RemoteID: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          task_object_budget?: string | null
          task_priority?: string | null
          task_status?: string | null
          task_type?: string | null
          TaskJob?: number | null
          TaskObjectSchedule?: number | null
          TaskObjectScheduleID?: number | null
          TaskTypeOrdering?: number | null
          TaskTypeStanding?: string | null
          TaskTypeTitle?: string | null
          Title?: string | null
          type?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Affiliation?: number | null
          against?: string | null
          AgainstID?: number | null
          AgainstType?: string | null
          assignee?: string | null
          Billable?: number | null
          Budgeted?: number | null
          Company?: number | null
          Contact?: number | null
          Creator?: number | null
          creator_id?: string | null
          CreatorType?: string | null
          custom_id?: string | null
          date_started?: string | null
          DateAccepted?: number | null
          DateCommenced?: number | null
          DateCompleted?: number | null
          DateCreated?: number | null
          DateDue?: number | null
          DateModified?: number | null
          Description?: string | null
          ID?: number
          IsDeleted?: boolean
          Issue?: number | null
          job?: string | null
          Logged?: number | null
          Manager?: number | null
          milestone?: string | null
          MirrorRemoteID?: number
          Nonbillable?: number | null
          object_budget?: string | null
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RateCharged?: number | null
          RateID?: number | null
          RawPayload?: Json | null
          Remaining?: number | null
          RemoteID?: string
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          StaffBookmarked?: boolean | null
          Standing?: string | null
          status?: string | null
          StatusID?: number | null
          task_object_budget?: string | null
          task_priority?: string | null
          task_status?: string | null
          task_type?: string | null
          TaskJob?: number | null
          TaskObjectSchedule?: number | null
          TaskObjectScheduleID?: number | null
          TaskTypeOrdering?: number | null
          TaskTypeStanding?: string | null
          TaskTypeTitle?: string | null
          Title?: string | null
          type?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_task_affiliation"
            columns: ["Affiliation"]
            isOneToOne: false
            referencedRelation: "Affiliation"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_task_company"
            columns: ["Company"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_task_contact"
            columns: ["Contact"]
            isOneToOne: false
            referencedRelation: "Contact"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_task_creator"
            columns: ["Creator"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_task_issue"
            columns: ["Issue"]
            isOneToOne: false
            referencedRelation: "Issue"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_task_job"
            columns: ["TaskJob"]
            isOneToOne: false
            referencedRelation: "Job"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_task_manager"
            columns: ["Manager"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_task_rate"
            columns: ["RateID"]
            isOneToOne: false
            referencedRelation: "Rate"
            referencedColumns: ["ID"]
          },
          {
            foreignKeyName: "fk_task_status"
            columns: ["StatusID"]
            isOneToOne: false
            referencedRelation: "TaskStatus"
            referencedColumns: ["ID"]
          },
        ]
      }
      TaskPriority: {
        Row: {
          icon: string | null
          id: string
          IsDeleted: boolean | null
          level: string | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          icon?: string | null
          id: string
          IsDeleted?: boolean | null
          level?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          icon?: string | null
          id?: string
          IsDeleted?: boolean | null
          level?: string | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      TaskStatus: {
        Row: {
          Color: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering: number | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          RemoteID: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          Standing: string | null
          statuses: Json | null
          TaskRemoteID: string | null
          Title: string | null
          WhenCreated: string | null
          WhenModified: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          Color?: string | null
          ID: number
          IsDeleted: boolean
          MirrorRemoteID: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          statuses?: Json | null
          TaskRemoteID?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          Color?: string | null
          ID?: number
          IsDeleted?: boolean
          MirrorRemoteID?: number
          Ordering?: number | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          RemoteID?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          Standing?: string | null
          statuses?: Json | null
          TaskRemoteID?: string | null
          Title?: string | null
          WhenCreated?: string | null
          WhenModified?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Tax: {
        Row: {
          id: string
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          rate: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          standing: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          id: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          rate?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          id?: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          rate?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          standing?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      TimeExternal: {
        Row: {
          date_created: string | null
          date_ended: string | null
          date_modified: string | null
          date_started: string | null
          description: string | null
          id: string
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: number | null
          SourceRecordID: string | null
          SourceRunID: string | null
          staff_id: string | null
          title: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          date_created?: string | null
          date_ended?: string | null
          date_modified?: string | null
          date_started?: string | null
          description?: string | null
          id: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          staff_id?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          date_created?: string | null
          date_ended?: string | null
          date_modified?: string | null
          date_started?: string | null
          description?: string | null
          id?: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: number | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          staff_id?: string | null
          title?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
      Timer: {
        Row: {
          against_id: string | null
          against_title: string | null
          against_type: string | null
          description: string | null
          id: string
          IsDeleted: boolean | null
          ParentRecordID: string | null
          ParentTable: string | null
          RawPayload: Json | null
          seconds: string | null
          SourceEndpoint: string | null
          SourceExtractedAt: string | null
          SourceField: string | null
          SourceModifiedAt: string | null
          SourceRecordID: string | null
          SourceRunID: string | null
          staff: string | null
          staff_id: string | null
          status: string | null
          subject: string | null
          timer_limit: string | null
          WhenUpsertedIntoDataStore: string | null
        }
        Insert: {
          against_id?: string | null
          against_title?: string | null
          against_type?: string | null
          description?: string | null
          id: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          seconds?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          staff?: string | null
          staff_id?: string | null
          status?: string | null
          subject?: string | null
          timer_limit?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Update: {
          against_id?: string | null
          against_title?: string | null
          against_type?: string | null
          description?: string | null
          id?: string
          IsDeleted?: boolean | null
          ParentRecordID?: string | null
          ParentTable?: string | null
          RawPayload?: Json | null
          seconds?: string | null
          SourceEndpoint?: string | null
          SourceExtractedAt?: string | null
          SourceField?: string | null
          SourceModifiedAt?: string | null
          SourceRecordID?: string | null
          SourceRunID?: string | null
          staff?: string | null
          staff_id?: string | null
          status?: string | null
          subject?: string | null
          timer_limit?: string | null
          WhenUpsertedIntoDataStore?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_onboarding_client: {
        Args: { p_onboarding_client_id: number }
        Returns: Json
      }
      complete_portal_signup: {
        Args: {
          p_company_directory_id?: number
          p_company_name?: string
          p_email: string
          p_full_name: string
        }
        Returns: Json
      }
      create_internal_signup_invite: {
        Args: {
          p_email: string
          p_expires_in_hours?: number
          p_full_name?: string
          p_invite_base_url?: string
          p_portal_role?: string
        }
        Returns: Json
      }
      get_internal_portal_context: { Args: never; Returns: Json }
      get_internal_signup_invite: {
        Args: { p_invite_token: string }
        Returns: Json
      }
      get_my_dashboard_resources: { Args: never; Returns: Json }
      get_my_dropbox_folder: { Args: never; Returns: Json }
      get_my_latest_submission_payload: {
        Args: { p_onboarding_client_id?: number }
        Returns: Json
      }
      get_my_portal_context: { Args: never; Returns: Json }
      internal_assert_portal_company_consistency: { Args: never; Returns: Json }
      internal_clear_dropbox_folder_binding: {
        Args: { p_onboarding_client_id: number }
        Returns: Json
      }
      internal_get_client_detail: {
        Args: { p_onboarding_client_id: number }
        Returns: Json
      }
      internal_get_dropbox_folder_binding: {
        Args: { p_onboarding_client_id: number }
        Returns: Json
      }
      internal_get_dropbox_status: { Args: never; Returns: Json }
      internal_get_sync_queue_summary: { Args: never; Returns: Json }
      internal_list_clients: {
        Args: {
          p_company_directory_id?: number
          p_limit?: number
          p_offset?: number
          p_search?: string
          p_stage?:
            | "contract_signed"
            | "intake_form"
            | "account_access"
            | "creative_kickoff"
            | "campaign_build"
            | "prelaunch_review"
            | "go_live"
          p_status?:
            | "draft"
            | "submitted"
            | "in_review"
            | "approved"
            | "resubmitted"
            | "abandoned"
            | "archived"
        }
        Returns: Json
      }
      internal_list_companies: {
        Args: { p_limit?: number; p_offset?: number; p_search?: string }
        Returns: Json
      }
      internal_list_onboarding_overview: {
        Args: {
          p_limit?: number
          p_search?: string
          p_stage?:
            | "contract_signed"
            | "intake_form"
            | "account_access"
            | "creative_kickoff"
            | "campaign_build"
            | "prelaunch_review"
            | "go_live"
        }
        Returns: Json
      }
      internal_process_sync_jobs: { Args: { p_limit?: number }; Returns: Json }
      internal_upsert_client_info: {
        Args: {
          p_additional_report_recipients?: string
          p_community_address?: string
          p_community_email?: string
          p_community_name?: string
          p_community_phone?: string
          p_company_directory_id?: number
          p_company_name?: string
          p_conversion_actions?: string
          p_current_stage?:
            | "contract_signed"
            | "intake_form"
            | "account_access"
            | "creative_kickoff"
            | "campaign_build"
            | "prelaunch_review"
            | "go_live"
          p_final_notes?: string
          p_hours_of_operation?: string
          p_onboarding_client_id?: number
          p_parent_company?: string
          p_preferred_communication_method?: string
          p_property_type?: string
          p_reporting_primary_email?: string
          p_reporting_primary_name?: string
          p_status?:
            | "draft"
            | "submitted"
            | "in_review"
            | "approved"
            | "resubmitted"
            | "abandoned"
            | "archived"
          p_target_go_live_at?: string
          p_technical_notes?: string
          p_website_url?: string
        }
        Returns: Json
      }
      internal_upsert_company_directory: {
        Args: {
          p_company_directory_id?: number
          p_company_name?: string
          p_public_company_id?: number
        }
        Returns: Json
      }
      list_my_communities: { Args: never; Returns: Json }
      list_my_platform_access: { Args: never; Returns: Json }
      list_my_task_states: { Args: never; Returns: Json }
      public_get_onboarding_snapshot: {
        Args: { p_onboarding_client_id: number; p_public_token: string }
        Returns: Json
      }
      public_list_task_states: {
        Args: { p_onboarding_client_id: number; p_public_token: string }
        Returns: Json
      }
      public_submit_intake: { Args: { p_payload: Json }; Returns: Json }
      public_upsert_task_state: {
        Args: {
          p_group_code?: string
          p_is_complete: boolean
          p_onboarding_client_id: number
          p_public_token: string
          p_task_key: string
          p_task_text?: string
        }
        Returns: Json
      }
      redeem_internal_signup_invite: {
        Args: { p_full_name?: string; p_invite_token: string }
        Returns: Json
      }
      search_companies: {
        Args: { p_limit?: number; p_query: string }
        Returns: Json
      }
      set_my_active_community: {
        Args: { p_onboarding_client_id: number }
        Returns: Json
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      submit_my_intake: { Args: { p_payload: Json }; Returns: Json }
      upsert_my_platform_access: {
        Args: {
          p_is_access_granted: boolean
          p_notes?: string
          p_platform_code: string
        }
        Returns: Json
      }
      upsert_my_task_state: {
        Args: {
          p_group_code?: string
          p_is_complete: boolean
          p_task_key: string
          p_task_text?: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
