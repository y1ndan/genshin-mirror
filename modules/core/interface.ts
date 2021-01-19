import { ArtifactSeries, ArtifactType, BuffCondition, BuffType, ElementType, Region, WeaponType, BuffTarget, ReactionType, BodyType } from "./enum";

/** 武器 */
export interface IWeapon {
  /** 序号 */ id: number;
  /** 名称 */ name: string;
  /** 类型 */ type: WeaponType;
  /** 稀有度 */ rarity: number;
  /** 基础攻击力 */ baseATK: number;
  /** 基础攻击力成长曲线 */ baseATKCurve: number;
  /** 武器突破阶段 */ promoteStages: IWeaponPromoteStage[];
  /** 副属性类型 */ subAttr?: IWeaponSubAttr;
  /** 特效 */ affix?: IWeaponAffix;
}

/** 武器突破阶段 */
export interface IWeaponPromoteStage {
  level: number;
  baseATK: number;
  cost: [string, number][];
}

/** 武器特效 */
export interface IWeaponAffix {
  name: string;
  levels: IWeaponAffixLevel[];
}

export interface IWeaponAffixLevel {
  /** 属性 */ attrs: IAttr[];
  /** 参数 */ params: number[];
}

/** 圣遗物 */
export interface IArtifact {
  /** 部位 */ type: ArtifactType;
  /** 等级 */ level: number;
  /** 系列 */ series: ArtifactSeries;
  /** 稀有度 */ rarity: number;
  /** 主副属性 */ attrs: IAttr[];
}

/** 角色 */
export interface IAvatar {
  /** id */ id: string;
  /** 本地化名称 */ localeName: string;
  /**
   * 名字
   *
   * @type {string}
   * @example 迪卢克
   */
  name: string;

  /**
   * 描述
   *
   * @type {string}
   */
  desc: string;

  /**
   * 体型
   *
   * @type {BodyType}
   */
  bodyType: BodyType;

  /**
   * 地区
   *
   * @type {string}
   * @example 1(蒙德)
   */
  region: Region;

  /**
   * 稀有度
   *
   * @type {number}
   * @example 5
   */
  rarity: number;
  /**
   * 元素属性
   *
   * @type {ElementType}
   * @example 6(火)
   */
  element: ElementType;
  /**
   * 武器类型
   *
   * @type {WeaponType}
   * @example 3(双手剑)
   */
  weapon: WeaponType;

  /** 基础生命 */ baseHP: number;
  /** 基础攻击 */ baseATK: number;
  /** 基础防御 */ baseDEF: number;
  /** 突破属性 */ ascensions: IAscension[];
  /** 突破属性 */ ascensionType: BuffType;
  /** 普通攻击 */ attackSkill?: ISkill;
  /** 元素战技 */ elemSkill?: ISkill;
  /** 元素爆发 */ elemBurst?: ISkill;
  /** 天赋 */ talents?: ITalent[];
  /** 命座提升 */ c13ns?: IConstellation[];
}

/** 攻击组 */
export interface IAttackGroup {
  name: string;
  /** 普通攻击 */
  normalAttack: IAttack[];
  /** 重击 */
  chargeAttack: IAttack[];
  /** 下落攻击 */
  plungeAttack: IAttack[];
}

/** 突破 */
export interface IAscension {
  level: number;
  itemCost: IItemStack[];
  attrs: IAttr[];
}

/** 物品 */
export interface IItemStack {
  name: string;
  count: number;
}

/** 攻击 */
export interface IAttack {
  name?: string;
  /** 各级别伤害倍率 */
  damage: number[];
  /** 伤害判定次数 */
  damageTimes?: number;
  /** 准备时间 */
  preTime?: number;
  /** 动作时间 */
  actTime?: number;
  /** 后摇时间 */
  backTime?: number;
  /** 间隔时间 */
  period?: number;
  /** 持续时间 */
  duration?: number;
  /** 体力消耗 */
  staminaCost?: number;
}

/** 技能 */
export interface ISkill {
  name: string;
  desc: string;
  cd: number;
  energyCost?: number;
  charges?: number;
  paramTpls?: string[];
  paramVals?: number[][];
  attrs?: ISkillAttribute[]; // 人工补充
}

/** 技能参数 */
export interface ISkillAttribute {
  name: string;
  /** 类型 */
  type: "heal" | "atk" | "enhance" | "summon";
  /** 伤害 */
  damage?: number[];
  /** 治疗 */
  heal?: number[];
  /** 持续时间 */
  duration?: number;
  /** 加成 */
  buff?: IBuff[];
}

/** 天赋 */
export interface ITalent {
  name: string;
  desc: string;
  values: number[];
}

/** 命之座 */
export interface IConstellation {
  name: string;
  desc: string;
  values?: number[];
  buffs?: IBuff[];
}

/** 属性 */
export interface IAttr {
  type: BuffType;
  value: number;
}
export interface IWeaponSubAttr {
  type: BuffType;
  value: number;
  curve: number;
}

/** 加成 */
export interface IBuff extends IAttr {
  cond?: BuffCondition;
  trigger?: BuffCondition;
  target?: BuffTarget;
  duration?: number;
  chance?: number;
  cd?: number;
  element?: ElementType; // for type == ElementalReactionDMG/ElementalAffectDuration
  reaction?: ReactionType[]; // for cond == ElementalReaction
  maxStack?: number;
  expr?: string;
}

/** 圣遗物组合效果 */
export interface IArtifactSetBonus {
  pieces: number;
  buffs: IBuff[];
}

export interface IEnemy {
  name: string;
  desc?: string;
  /** 基础生命 */ baseHP: number;
  /** 基础攻击 */ baseATK: number;
  /** 基础防御 */ baseDEF: number;
}
