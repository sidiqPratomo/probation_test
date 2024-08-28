import { useIntl } from "react-intl";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Products
          </span>
        </div>
      </div>

      <SidebarMenuItem
        to="/products"
        title="Components"
        icon="element-7"
        fontIcon="bi-layers"
      />

      <SidebarMenuItem
        to="/examples"
        title="Examples"
        icon="element-7"
        fontIcon="bi-layers"
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Setting
          </span>
        </div>
      </div>
      <SidebarMenuItem
        to="/sysparams"
        title="Sysparams"
        fontIcon="bi-archive"
        icon="element-plus"
      ></SidebarMenuItem>

      <SidebarMenuItem
        to="/privileges"
        title="Privileges"
        fontIcon="bi-archive"
        icon="element-plus"
      ></SidebarMenuItem>

      <SidebarMenuItem
        to="/roles"
        title="Roles"
        fontIcon="bi-archive"
        icon="element-plus"
      ></SidebarMenuItem>

      <SidebarMenuItem
        to="/province"
        title="Province"
        fontIcon="bi-archive"
        icon="element-plus"
      ></SidebarMenuItem>

      <SidebarMenuItem
        to="/city"
        title="City"
        fontIcon="bi-archive"
        icon="element-plus"
      ></SidebarMenuItem>

      <SidebarMenuItem
        to="/district"
        title="District"
        fontIcon="bi-archive"
        icon="element-plus"
      ></SidebarMenuItem>

      <SidebarMenuItem
        to="/subdistrict"
        title="SubDistrict"
        fontIcon="bi-archive"
        icon="element-plus"
      ></SidebarMenuItem>

      <SidebarMenuItem
        to="/auditrails"
        title="Auditrails"
        fontIcon="bi-gear"
        icon="gear"
      ></SidebarMenuItem>

      <SidebarMenuItemWithSub
        to=""
        title="Trash"
        icon="trash"
        fontIcon="bi-trash"
      >
        <SidebarMenuItem
          to="/examples/trash"
          title="Examples"
          hasBullet={true}
        ></SidebarMenuItem>
      </SidebarMenuItemWithSub>
    </>
  );
};

export { SidebarMenuMain };
