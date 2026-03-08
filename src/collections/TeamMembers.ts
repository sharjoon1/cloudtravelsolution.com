import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    group: "Business",
    defaultColumns: ["name", "role", "department", "sortOrder"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      admin: {
        description: "E.g. Director, Co-Director, Visa Consultant, Operations Manager",
      },
    },
    {
      name: "department",
      type: "select",
      required: true,
      defaultValue: "team",
      options: [
        { label: "Leadership (Directors)", value: "leadership" },
        { label: "Management", value: "management" },
        { label: "Visa Specialists", value: "specialists" },
        { label: "Team", value: "team" },
      ],
      admin: {
        description: "Determines which section the member appears in on the team page",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "experience",
      type: "text",
      admin: {
        description: "E.g. 20+ years, 5 years",
      },
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "locations",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower number = appears first",
      },
    },
  ],
};
