import { RootState } from "./../../redux/store";

export const selectedTab = (state: RootState) => state.setting.settingTabSelected;
