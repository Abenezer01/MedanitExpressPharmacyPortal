// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: ("dashboards"),
      icon: "tabler:smart-home",
      path: "/dashboard",
      action: "read",
      subject: "dashboard",
    },
    {
      sectionTitle: ("admin_module"),
      action: "read",
      subject: "user",
    },
    {
      title: ("user"),
      icon: "tabler:user",
      children: [
        {
          title: ("list"),
          path: "/admin/users",
          action: "read",
          subject: "user",
        },
      ],
    },
    {
      title: ("roles_and_permissions"),
      icon: "tabler:settings",
      children: [
        {
          title: ("roles"),
          path: "/admin/roles",
          action: "read",
          subject: "role",
        },
        {
          title: ("permissions"),
          path: "/admin/permissions",
          action: "read",
          subject: "permission",
        },
      ],
    },
    {
      sectionTitle: ("members_module"),
      action: "read",
      subject: "member",
    },
    {
      title: ("members"),
      icon: "tabler:users",
      path: "/member/members",
      action: "read",
      subject: "member",
    },
    {
      title: ("families"),
      icon: "tabler:users-group",
      path: "/member/families",
      action: "read",
      subject: "member",
    },
    {
      sectionTitle: ("team_module"),
      action: "read",
      subject: "department",
    },
    {
      title: ("departments"),
      icon: "tabler:components",
      path: "/team/departments",
      action: "read",
      subject: "department",
    },
    {
      title: ("small_teams"),
      icon: "tabler:users-group",
      children: [
        {
          title: ("list"),
          path: "/team/small-teams/list",
          action: "read",
          subject: "smallteam",
        },
        {
          title: ("notice_board"),
          path: "/team/small-teams/notice-board",
          action: "read",
          subject: "noticeboard",
        },
      ],
    },
    {
      sectionTitle: ("children_module"),
      action: "read",
      subject: "children",
    },
    {
      title: ("children_module"),
      icon: "tabler:users-group",
      children: [
        {
          title: ("children"),
          path: "/child/children",
          action: "read",
          subject: "smallteam",
        },
      ],
    },
    {
      sectionTitle: ("school_module"),
      action: "read",
      subject: "user",
    },
    {
      title: ("school_module"),
      icon: "tabler:users-group",
      children: [
        {
          title: ("classes"),
          path: "/school/classes",
          action: "read",
          subject: "smallteam",
        }, {
          title: ("teachers"),
          path: "/school/teachers",
          action: "read",
          subject: "teacher",
        },
        {
          title: "students",
          path: "/school/students",
          action: "read",
          subject: "student"
        },
        {
          title: "sessions",
          path: "/school/sessions",
          action: "read",
          subject: "familysupporttype"
        },
        {
          title: "family-support-types",
          path: "/school/family-support-types",
          action: "read",
          subject: "familysupporttype"
        }
      ],
    },
  ];
};

export default navigation;
