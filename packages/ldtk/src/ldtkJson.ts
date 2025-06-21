/**
 * QuickType generated code for LDtk JSON schema. Version 1.5.3
 *
 * This is the root of any Project JSON file. It contains:  - the project settings, - an
 * array of levels, - a group of definitions (that can probably be safely ignored for most
 * users).
 */
export type LdtkProjectJson = {
  /**
   * This object is not actually used by LDtk. It ONLY exists to force explicit references to
   * all types, to make sure QuickType finds them and integrate all of them. Otherwise,
   * Quicktype will drop types that are not explicitely used.
   */
  __FORCED_REFS?: ForcedRefs;
  /**
   * LDtk application build identifier.<br/>  This is only used to identify the LDtk version
   * that generated this particular project file, which can be useful for specific bug fixing.
   * Note that the build identifier is just the date of the release, so it's not unique to
   * each user (one single global ID per LDtk public release), and as a result, completely
   * anonymous.
   */
  appBuildId: number;
  /**
   * Number of backup files to keep, if the `backupOnSave` is TRUE
   */
  backupLimit: number;
  /**
   * If TRUE, an extra copy of the project will be created in a sub folder, when saving.
   */
  backupOnSave: boolean;
  /**
   * Target relative path to store backup files
   */
  backupRelPath?: null | string;
  /**
   * Project background color
   */
  bgColor: string;
  /**
   * An array of command lines that can be ran manually by the user
   */
  customCommands: LdtkCustomCommand[];
  /**
   * Default height for new entities
   */
  defaultEntityHeight: number;
  /**
   * Default width for new entities
   */
  defaultEntityWidth: number;
  /**
   * Default grid size for new layers
   */
  defaultGridSize: number;
  /**
   * Default background color of levels
   */
  defaultLevelBgColor: string;
  /**
   * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
   * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
   * the change immediately.<br/><br/>  Default new level height
   */
  defaultLevelHeight?: number | null;
  /**
   * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
   * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
   * the change immediately.<br/><br/>  Default new level width
   */
  defaultLevelWidth?: number | null;
  /**
   * Default X pivot (0 to 1) for new entities
   */
  defaultPivotX: number;
  /**
   * Default Y pivot (0 to 1) for new entities
   */
  defaultPivotY: number;
  /**
   * A structure containing all the definitions of this project
   */
  defs: Definitions;
  /**
   * If the project isn't in MultiWorlds mode, this is the IID of the internal "dummy" World.
   */
  dummyWorldIid: string;
  /**
   * If TRUE, the exported PNGs will include the level background (color or image).
   */
  exportLevelBg: boolean;
  /**
   * **WARNING**: this deprecated value is no longer exported since version 0.9.3  Replaced
   * by: `imageExportMode`
   */
  exportPng?: boolean | null;
  /**
   * If TRUE, a Tiled compatible file will also be generated along with the LDtk JSON file
   * (default is FALSE)
   */
  exportTiled: boolean;
  /**
   * If TRUE, one file will be saved for the project (incl. all its definitions) and one file
   * in a sub-folder for each level.
   */
  externalLevels: boolean;
  /**
   * An array containing various advanced flags (ie. options or other states). Possible
   * values: `DiscardPreCsvIntGrid`, `ExportOldTableOfContentData`,
   * `ExportPreCsvIntGridFormat`, `IgnoreBackupSuggest`, `PrependIndexToLevelFileNames`,
   * `MultiWorlds`, `UseMultilinesType`
   */
  flags: Flag[];
  /**
   * Naming convention for Identifiers (first-letter uppercase, full uppercase etc.) Possible
   * values: `Capitalize`, `Uppercase`, `Lowercase`, `Free`
   */
  identifierStyle: IdentifierStyle;
  /**
   * Unique project identifier
   */
  iid: string;
  /**
   * "Image export" option when saving project. Possible values: `None`, `OneImagePerLayer`,
   * `OneImagePerLevel`, `LayersAndLevels`
   */
  imageExportMode: ImageExportMode;
  /**
   * File format version
   */
  jsonVersion: string;
  /**
   * The default naming convention for level identifiers.
   */
  levelNamePattern: string;
  /**
   * All levels. The order of this array is only relevant in `LinearHorizontal` and
   * `linearVertical` world layouts (see `worldLayout` value).<br/>  Otherwise, you should
   * refer to the `worldX`,`worldY` coordinates of each Level.
   */
  levels: Level[];
  /**
   * If TRUE, the Json is partially minified (no indentation, nor line breaks, default is
   * FALSE)
   */
  minifyJson: boolean;
  /**
   * Next Unique integer ID available
   */
  nextUid: number;
  /**
   * File naming pattern for exported PNGs
   */
  pngFilePattern?: null | string;
  /**
   * If TRUE, a very simplified will be generated on saving, for quicker & easier engine
   * integration.
   */
  simplifiedExport: boolean;
  /**
   * All instances of entities that have their `exportToToc` flag enabled are listed in this
   * array.
   */
  toc: LdtkTableOfContentEntry[];
  /**
   * This optional description is used by LDtk Samples to show up some informations and
   * instructions.
   */
  tutorialDesc?: null | string;
  /**
   * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
   * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
   * the change immediately.<br/><br/>  Height of the world grid in pixels.
   */
  worldGridHeight?: number | null;
  /**
   * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
   * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
   * the change immediately.<br/><br/>  Width of the world grid in pixels.
   */
  worldGridWidth?: number | null;
  /**
   * **WARNING**: this field will move to the `worlds` array after the "multi-worlds" update.
   * It will then be `null`. You can enable the Multi-worlds advanced project option to enable
   * the change immediately.<br/><br/>  An enum that describes how levels are organized in
   * this project (ie. linearly or in a 2D space). Possible values: &lt;`null`&gt;, `Free`,
   * `GridVania`, `LinearHorizontal`, `LinearVertical`
   */
  worldLayout?: WorldLayout | null;
  /**
   * This array will be empty, unless you enable the Multi-Worlds in the project advanced
   * settings.<br/><br/> - in current version, a LDtk project file can only contain a single
   * world with multiple levels in it. In this case, levels and world layout related settings
   * are stored in the root of the JSON.<br/> - with "Multi-worlds" enabled, there will be a
   * `worlds` array in root, each world containing levels and layout settings. Basically, it's
   * pretty much only about moving the `levels` array to the `worlds` array, along with world
   * layout related values (eg. `worldGridWidth` etc).<br/><br/>If you want to start
   * supporting this future update easily, please refer to this documentation:
   * https://github.com/deepnight/ldtk/issues/231
   */
  worlds: World[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [property: string]: any;
};

/**
 * This object is not actually used by LDtk. It ONLY exists to force explicit references to
 * all types, to make sure QuickType finds them and integrate all of them. Otherwise,
 * Quicktype will drop types that are not explicitely used.
 */
export type ForcedRefs = {
  AutoLayerRuleGroup?: AutoLayerRuleGroup;
  AutoRuleDef?: AutoLayerRuleDefinition;
  CustomCommand?: LdtkCustomCommand;
  Definitions?: Definitions;
  EntityDef?: EntityDefinition;
  EntityInstance?: EntityInstance;
  EntityReferenceInfos?: ReferenceToAnEntityInstance;
  EnumDef?: EnumDefinition;
  EnumDefValues?: EnumValueDefinition;
  EnumTagValue?: EnumTagValue;
  FieldDef?: FieldDefinition;
  FieldInstance?: FieldInstance;
  GridPoint?: GridPoint;
  IntGridValueDef?: IntGridValueDefinition;
  IntGridValueGroupDef?: IntGridValueGroupDefinition;
  IntGridValueInstance?: IntGridValueInstance;
  LayerDef?: LayerDefinition;
  LayerInstance?: LayerInstance;
  Level?: Level;
  LevelBgPosInfos?: LevelBackgroundPosition;
  NeighbourLevel?: NeighbourLevel;
  TableOfContentEntry?: LdtkTableOfContentEntry;
  Tile?: TileInstance;
  TileCustomMetadata?: TileCustomMetadata;
  TilesetDef?: TilesetDefinition;
  TilesetRect?: TilesetRectangle;
  TocInstanceData?: LdtkTocInstanceData;
  World?: World;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [property: string]: any;
};

export type AutoLayerRuleGroup = {
  active: boolean;
  biomeRequirementMode: number;
  /**
   * *This field was removed in 1.0.0 and should no longer be used.*
   */
  collapsed?: boolean | null;
  color?: null | string;
  icon?: TilesetRectangle | null;
  isOptional: boolean;
  name: string;
  requiredBiomeValues: string[];
  rules: AutoLayerRuleDefinition[];
  uid: number;
  usesWizard: boolean;
};

/**
 * This object represents a custom sub rectangle in a Tileset image.
 */
export type TilesetRectangle = {
  /**
   * Height in pixels
   */
  h: number;
  /**
   * UID of the tileset
   */
  tilesetUid: number;
  /**
   * Width in pixels
   */
  w: number;
  /**
   * X pixels coordinate of the top-left corner in the Tileset image
   */
  x: number;
  /**
   * Y pixels coordinate of the top-left corner in the Tileset image
   */
  y: number;
};

/**
 * This complex section isn't meant to be used by game devs at all, as these rules are
 * completely resolved internally by the editor before any saving. You should just ignore
 * this part.
 */
export type AutoLayerRuleDefinition = {
  /**
   * If FALSE, the rule effect isn't applied, and no tiles are generated.
   */
  active: boolean;
  alpha: number;
  /**
   * When TRUE, the rule will prevent other rules to be applied in the same cell if it matches
   * (TRUE by default).
   */
  breakOnMatch: boolean;
  /**
   * Chances for this rule to be applied (0 to 1)
   */
  chance: number;
  /**
   * Checker mode Possible values: `None`, `Horizontal`, `Vertical`
   */
  checker: Checker;
  /**
   * If TRUE, allow rule to be matched by flipping its pattern horizontally
   */
  flipX: boolean;
  /**
   * If TRUE, allow rule to be matched by flipping its pattern vertically
   */
  flipY: boolean;
  /**
   * If TRUE, then the rule should be re-evaluated by the editor at one point
   */
  invalidated: boolean;
  /**
   * Default IntGrid value when checking cells outside of level bounds
   */
  outOfBoundsValue?: number | null;
  /**
   * Rule pattern (size x size)
   */
  pattern: number[];
  /**
   * If TRUE, enable Perlin filtering to only apply rule on specific random area
   */
  perlinActive: boolean;
  perlinOctaves: number;
  perlinScale: number;
  perlinSeed: number;
  /**
   * X pivot of a tile stamp (0-1)
   */
  pivotX: number;
  /**
   * Y pivot of a tile stamp (0-1)
   */
  pivotY: number;
  /**
   * Pattern width & height. Should only be 1,3,5 or 7.
   */
  size: number;
  /**
   * **WARNING**: this deprecated value is no longer exported since version 1.5.0  Replaced
   * by: `tileRectsIds`
   */
  tileIds?: number[] | null;
  /**
   * Defines how tileIds array is used Possible values: `Single`, `Stamp`
   */
  tileMode: TileMode;
  /**
   * Max random offset for X tile pos
   */
  tileRandomXMax: number;
  /**
   * Min random offset for X tile pos
   */
  tileRandomXMin: number;
  /**
   * Max random offset for Y tile pos
   */
  tileRandomYMax: number;
  /**
   * Min random offset for Y tile pos
   */
  tileRandomYMin: number;
  /**
   * Array containing all the possible tile IDs rectangles (picked randomly).
   */
  tileRectsIds: Array<number[]>;
  /**
   * Tile X offset
   */
  tileXOffset: number;
  /**
   * Tile Y offset
   */
  tileYOffset: number;
  /**
   * Unique Int identifier
   */
  uid: number;
  /**
   * X cell coord modulo
   */
  xModulo: number;
  /**
   * X cell start offset
   */
  xOffset: number;
  /**
   * Y cell coord modulo
   */
  yModulo: number;
  /**
   * Y cell start offset
   */
  yOffset: number;
};

/**
 * Checker mode Possible values: `None`, `Horizontal`, `Vertical`
 */
export type Checker = 'None' | 'Horizontal' | 'Vertical';

/**
 * Defines how tileIds array is used Possible values: `Single`, `Stamp`
 */
export type TileMode = 'Single' | 'Stamp';

export type LdtkCustomCommand = {
  command: string;
  /**
   * Possible values: `Manual`, `AfterLoad`, `BeforeSave`, `AfterSave`
   */
  when: When;
};

/**
 * Possible values: `Manual`, `AfterLoad`, `BeforeSave`, `AfterSave`
 */
export type When = 'Manual' | 'AfterLoad' | 'BeforeSave' | 'AfterSave';

/**
 * If you're writing your own LDtk importer, you should probably just ignore *most* stuff in
 * the `defs` section, as it contains data that are mostly important to the editor. To keep
 * you away from the `defs` section and avoid some unnecessary JSON parsing, important data
 * from definitions is often duplicated in fields prefixed with a double underscore (eg.
 * `__identifier` or `__type`).  The 2 only definition types you might need here are
 * **Tilesets** and **Enums**.
 *
 * A structure containing all the definitions of this project
 */
export type Definitions = {
  /**
   * All entities definitions, including their custom fields
   */
  entities: EntityDefinition[];
  /**
   * All internal enums
   */
  enums: EnumDefinition[];
  /**
   * Note: external enums are exactly the same as `enums`, except they have a `relPath` to
   * point to an external source file.
   */
  externalEnums: EnumDefinition[];
  /**
   * All layer definitions
   */
  layers: LayerDefinition[];
  /**
   * All custom fields available to all levels.
   */
  levelFields: FieldDefinition[];
  /**
   * All tilesets
   */
  tilesets: TilesetDefinition[];
};

export type EntityDefinition = {
  /**
   * If enabled, this entity is allowed to stay outside of the current level bounds
   */
  allowOutOfBounds: boolean;
  /**
   * Base entity color
   */
  color: string;
  /**
   * User defined documentation for this element to provide help/tips to level designers.
   */
  doc?: null | string;
  /**
   * If enabled, all instances of this entity will be listed in the project "Table of content"
   * object.
   */
  exportToToc: boolean;
  /**
   * Array of field definitions
   */
  fieldDefs: FieldDefinition[];
  fillOpacity: number;
  /**
   * Pixel height
   */
  height: number;
  hollow: boolean;
  /**
   * User defined unique identifier
   */
  identifier: string;
  /**
   * Only applies to entities resizable on both X/Y. If TRUE, the entity instance width/height
   * will keep the same aspect ratio as the definition.
   */
  keepAspectRatio: boolean;
  /**
   * Possible values: `DiscardOldOnes`, `PreventAdding`, `MoveLastOne`
   */
  limitBehavior: LimitBehavior;
  /**
   * If TRUE, the maxCount is a "per world" limit, if FALSE, it's a "per level". Possible
   * values: `PerLayer`, `PerLevel`, `PerWorld`
   */
  limitScope: LimitScope;
  lineOpacity: number;
  /**
   * Max instances count
   */
  maxCount: number;
  /**
   * Max pixel height (only applies if the entity is resizable on Y)
   */
  maxHeight?: number | null;
  /**
   * Max pixel width (only applies if the entity is resizable on X)
   */
  maxWidth?: number | null;
  /**
   * Min pixel height (only applies if the entity is resizable on Y)
   */
  minHeight?: number | null;
  /**
   * Min pixel width (only applies if the entity is resizable on X)
   */
  minWidth?: number | null;
  /**
   * An array of 4 dimensions for the up/right/down/left borders (in this order) when using
   * 9-slice mode for `tileRenderMode`.<br/>  If the tileRenderMode is not NineSlice, then
   * this array is empty.<br/>  See: https://en.wikipedia.org/wiki/9-slice_scaling
   */
  nineSliceBorders: number[];
  /**
   * Pivot X coordinate (from 0 to 1.0)
   */
  pivotX: number;
  /**
   * Pivot Y coordinate (from 0 to 1.0)
   */
  pivotY: number;
  /**
   * Possible values: `Rectangle`, `Ellipse`, `Tile`, `Cross`
   */
  renderMode: RenderMode;
  /**
   * If TRUE, the entity instances will be resizable horizontally
   */
  resizableX: boolean;
  /**
   * If TRUE, the entity instances will be resizable vertically
   */
  resizableY: boolean;
  /**
   * Display entity name in editor
   */
  showName: boolean;
  /**
   * An array of strings that classifies this entity
   */
  tags: string[];
  /**
   * **WARNING**: this deprecated value is no longer exported since version 1.2.0  Replaced
   * by: `tileRect`
   */
  tileId?: number | null;
  tileOpacity: number;
  /**
   * An object representing a rectangle from an existing Tileset
   */
  tileRect?: TilesetRectangle | null;
  /**
   * An enum describing how the the Entity tile is rendered inside the Entity bounds. Possible
   * values: `Cover`, `FitInside`, `Repeat`, `Stretch`, `FullSizeCropped`,
   * `FullSizeUncropped`, `NineSlice`
   */
  tileRenderMode: TileRenderMode;
  /**
   * Tileset ID used for optional tile display
   */
  tilesetId?: number | null;
  /**
   * Unique Int identifier
   */
  uid: number;
  /**
   * This tile overrides the one defined in `tileRect` in the UI
   */
  uiTileRect?: TilesetRectangle | null;
  /**
   * Pixel width
   */
  width: number;
};

/**
 * This section is mostly only intended for the LDtk editor app itself. You can safely
 * ignore it.
 */
export type FieldDefinition = {
  /**
   * Human readable value type. Possible values: `Int, Float, String, Bool, Color,
   * ExternEnum.XXX, LocalEnum.XXX, Point, FilePath`.<br/>  If the field is an array, this
   * field will look like `Array<...>` (eg. `Array<Int>`, `Array<Point>` etc.)<br/>  NOTE: if
   * you enable the advanced option **Use Multilines type**, you will have "*Multilines*"
   * instead of "*String*" when relevant.
   */
  __type: string;
  /**
   * Optional list of accepted file extensions for FilePath value type. Includes the dot:
   * `.ext`
   */
  acceptFileTypes?: string[] | null;
  /**
   * Possible values: `Any`, `OnlySame`, `OnlyTags`, `OnlySpecificEntity`
   */
  allowedRefs: AllowedRefs;
  allowedRefsEntityUid?: number | null;
  allowedRefTags: string[];
  allowOutOfLevelRef: boolean;
  /**
   * Array max length
   */
  arrayMaxLength?: number | null;
  /**
   * Array min length
   */
  arrayMinLength?: number | null;
  autoChainRef: boolean;
  /**
   * TRUE if the value can be null. For arrays, TRUE means it can contain null values
   * (exception: array of Points can't have null values).
   */
  canBeNull: boolean;
  /**
   * Default value if selected value is null or invalid.
   */

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultOverride?: any;
  /**
   * User defined documentation for this field to provide help/tips to level designers about
   * accepted values.
   */
  doc?: null | string;
  editorAlwaysShow: boolean;
  editorCutLongValues: boolean;
  editorDisplayColor?: null | string;
  /**
   * Possible values: `Hidden`, `ValueOnly`, `NameAndValue`, `EntityTile`, `LevelTile`,
   * `Points`, `PointStar`, `PointPath`, `PointPathLoop`, `RadiusPx`, `RadiusGrid`,
   * `ArrayCountWithLabel`, `ArrayCountNoLabel`, `RefLinkBetweenPivots`,
   * `RefLinkBetweenCenters`
   */
  editorDisplayMode: EditorDisplayMode;
  /**
   * Possible values: `Above`, `Center`, `Beneath`
   */
  editorDisplayPos: EditorDisplayPos;
  editorDisplayScale: number;
  /**
   * Possible values: `ZigZag`, `StraightArrow`, `CurvedArrow`, `ArrowsLine`, `DashedLine`
   */
  editorLinkStyle: EditorLinkStyle;
  editorShowInWorld: boolean;
  editorTextPrefix?: null | string;
  editorTextSuffix?: null | string;
  /**
   * If TRUE, the field value will be exported to the `toc` project JSON field. Only applies
   * to Entity fields.
   */
  exportToToc: boolean;
  /**
   * User defined unique identifier
   */
  identifier: string;
  /**
   * TRUE if the value is an array of multiple values
   */
  isArray: boolean;
  /**
   * Max limit for value, if applicable
   */
  max?: number | null;
  /**
   * Min limit for value, if applicable
   */
  min?: number | null;
  /**
   * Optional regular expression that needs to be matched to accept values. Expected format:
   * `/some_reg_ex/g`, with optional "i" flag.
   */
  regex?: null | string;
  /**
   * If enabled, this field will be searchable through LDtk command palette
   */
  searchable: boolean;
  symmetricalRef: boolean;
  /**
   * Possible values: &lt;`null`&gt;, `LangPython`, `LangRuby`, `LangJS`, `LangLua`, `LangC`,
   * `LangHaxe`, `LangMarkdown`, `LangJson`, `LangXml`, `LangLog`
   */
  textLanguageMode?: TextLanguageMode | null;
  /**
   * UID of the tileset used for a Tile
   */
  tilesetUid?: number | null;
  /**
   * Internal enum representing the possible field types. Possible values: F_Int, F_Float,
   * F_String, F_Text, F_Bool, F_Color, F_Enum(...), F_Point, F_Path, F_EntityRef, F_Tile
   */
  type: string;
  /**
   * Unique Int identifier
   */
  uid: number;
  /**
   * If TRUE, the color associated with this field will override the Entity or Level default
   * color in the editor UI. For Enum fields, this would be the color associated to their
   * values.
   */
  useForSmartColor: boolean;
};

/**
 * Possible values: `Any`, `OnlySame`, `OnlyTags`, `OnlySpecificEntity`
 */
export type AllowedRefs = 'Any' | 'OnlySame' | 'OnlyTags' | 'OnlySpecificEntity';

/**
 * Possible values: `Hidden`, `ValueOnly`, `NameAndValue`, `EntityTile`, `LevelTile`,
 * `Points`, `PointStar`, `PointPath`, `PointPathLoop`, `RadiusPx`, `RadiusGrid`,
 * `ArrayCountWithLabel`, `ArrayCountNoLabel`, `RefLinkBetweenPivots`,
 * `RefLinkBetweenCenters`
 */
export type EditorDisplayMode =
  | 'Hidden'
  | 'ValueOnly'
  | 'NameAndValue'
  | 'EntityTile'
  | 'LevelTile'
  | 'Points'
  | 'PointStar'
  | 'PointPath'
  | 'PointPathLoop'
  | 'RadiusPx'
  | 'RadiusGrid'
  | 'ArrayCountWithLabel'
  | 'ArrayCountNoLabel'
  | 'RefLinkBetweenPivots'
  | 'RefLinkBetweenCenters';

/**
 * Possible values: `Above`, `Center`, `Beneath`
 */
export type EditorDisplayPos = 'Above' | 'Center' | 'Beneath';

/**
 * Possible values: `ZigZag`, `StraightArrow`, `CurvedArrow`, `ArrowsLine`, `DashedLine`
 */
export type EditorLinkStyle = 'ZigZag' | 'StraightArrow' | 'CurvedArrow' | 'ArrowsLine' | 'DashedLine';

export type TextLanguageMode =
  | 'LangPython'
  | 'LangRuby'
  | 'LangJS'
  | 'LangLua'
  | 'LangC'
  | 'LangHaxe'
  | 'LangMarkdown'
  | 'LangJson'
  | 'LangXml'
  | 'LangLog';

/**
 * Possible values: `DiscardOldOnes`, `PreventAdding`, `MoveLastOne`
 */
export type LimitBehavior = 'DiscardOldOnes' | 'PreventAdding' | 'MoveLastOne';

/**
 * If TRUE, the maxCount is a "per world" limit, if FALSE, it's a "per level". Possible
 * values: `PerLayer`, `PerLevel`, `PerWorld`
 */
export type LimitScope = 'PerLayer' | 'PerLevel' | 'PerWorld';

/**
 * Possible values: `Rectangle`, `Ellipse`, `Tile`, `Cross`
 */
export type RenderMode = 'Rectangle' | 'Ellipse' | 'Tile' | 'Cross';

/**
 * An enum describing how the the Entity tile is rendered inside the Entity bounds. Possible
 * values: `Cover`, `FitInside`, `Repeat`, `Stretch`, `FullSizeCropped`,
 * `FullSizeUncropped`, `NineSlice`
 */
export type TileRenderMode =
  | 'Cover'
  | 'FitInside'
  | 'Repeat'
  | 'Stretch'
  | 'FullSizeCropped'
  | 'FullSizeUncropped'
  | 'NineSlice';

export type LayerType = 'IntGrid' | 'Entities' | 'Tiles' | 'AutoLayer';

export type EnumDefinition = {
  externalFileChecksum?: null | string;
  /**
   * Relative path to the external file providing this Enum
   */
  externalRelPath?: null | string;
  /**
   * Tileset UID if provided
   */
  iconTilesetUid?: number | null;
  /**
   * User defined unique identifier
   */
  identifier: string;
  /**
   * An array of user-defined tags to organize the Enums
   */
  tags: string[];
  /**
   * Unique Int identifier
   */
  uid: number;
  /**
   * All possible enum values, with their optional Tile infos.
   */
  values: EnumValueDefinition[];
};

export type EnumValueDefinition = {
  /**
   * **WARNING**: this deprecated value is no longer exported since version 1.4.0  Replaced
   * by: `tileRect`
   */
  __tileSrcRect?: number[] | null;
  /**
   * Optional color
   */
  color: number;
  /**
   * Enum value
   */
  id: string;
  /**
   * **WARNING**: this deprecated value is no longer exported since version 1.4.0  Replaced
   * by: `tileRect`
   */
  tileId?: number | null;
  /**
   * Optional tileset rectangle to represents this value
   */
  tileRect?: TilesetRectangle | null;
};

export type LayerDefinition = {
  /**
   * Type of the layer (*IntGrid, Entities, Tiles or AutoLayer*)
   */
  __type: LayerType;
  /**
   * Contains all the auto-layer rule definitions.
   */
  autoRuleGroups: AutoLayerRuleGroup[];
  autoSourceLayerDefUid?: number | null;
  /**
   * **WARNING**: this deprecated value is no longer exported since version 1.2.0  Replaced
   * by: `tilesetDefUid`
   */
  autoTilesetDefUid?: number | null;
  autoTilesKilledByOtherLayerUid?: number | null;
  biomeFieldUid?: number | null;
  /**
   * Allow editor selections when the layer is not currently active.
   */
  canSelectWhenInactive: boolean;
  /**
   * Opacity of the layer (0 to 1.0)
   */
  displayOpacity: number;
  /**
   * User defined documentation for this element to provide help/tips to level designers.
   */
  doc?: null | string;
  /**
   * An array of tags to forbid some Entities in this layer
   */
  excludedTags: string[];
  /**
   * Width and height of the grid in pixels
   */
  gridSize: number;
  /**
   * Height of the optional "guide" grid in pixels
   */
  guideGridHei: number;
  /**
   * Width of the optional "guide" grid in pixels
   */
  guideGridWid: number;
  hideFieldsWhenInactive: boolean;
  /**
   * Hide the layer from the list on the side of the editor view.
   */
  hideInList: boolean;
  /**
   * User defined unique identifier
   */
  identifier: string;
  /**
   * Alpha of this layer when it is not the active one.
   */
  inactiveOpacity: number;
  /**
   * An array that defines extra optional info for each IntGrid value.<br/>  WARNING: the
   * array order is not related to actual IntGrid values! As user can re-order IntGrid values
   * freely, you may value "2" before value "1" in this array.
   */
  intGridValues: IntGridValueDefinition[];
  /**
   * Group informations for IntGrid values
   */
  intGridValuesGroups: IntGridValueGroupDefinition[];
  /**
   * Parallax horizontal factor (from -1 to 1, defaults to 0) which affects the scrolling
   * speed of this layer, creating a fake 3D (parallax) effect.
   */
  parallaxFactorX: number;
  /**
   * Parallax vertical factor (from -1 to 1, defaults to 0) which affects the scrolling speed
   * of this layer, creating a fake 3D (parallax) effect.
   */
  parallaxFactorY: number;
  /**
   * If true (default), a layer with a parallax factor will also be scaled up/down accordingly.
   */
  parallaxScaling: boolean;
  /**
   * X offset of the layer, in pixels (IMPORTANT: this should be added to the `LayerInstance`
   * optional offset)
   */
  pxOffsetX: number;
  /**
   * Y offset of the layer, in pixels (IMPORTANT: this should be added to the `LayerInstance`
   * optional offset)
   */
  pxOffsetY: number;
  /**
   * If TRUE, the content of this layer will be used when rendering levels in a simplified way
   * for the world view
   */
  renderInWorldView: boolean;
  /**
   * An array of tags to filter Entities that can be added to this layer
   */
  requiredTags: string[];
  /**
   * If the tiles are smaller or larger than the layer grid, the pivot value will be used to
   * position the tile relatively its grid cell.
   */
  tilePivotX: number;
  /**
   * If the tiles are smaller or larger than the layer grid, the pivot value will be used to
   * position the tile relatively its grid cell.
   */
  tilePivotY: number;
  /**
   * Reference to the default Tileset UID being used by this layer definition.<br/>
   * **WARNING**: some layer *instances* might use a different tileset. So most of the time,
   * you should probably use the `__tilesetDefUid` value found in layer instances.<br/>  Note:
   * since version 1.0.0, the old `autoTilesetDefUid` was removed and merged into this value.
   */
  tilesetDefUid?: number | null;
  /**
   * Type of the layer as Haxe Enum Possible values: `IntGrid`, `Entities`, `Tiles`,
   * `AutoLayer`
   */
  type: Type;
  /**
   * User defined color for the UI
   */
  uiColor?: null | string;
  /**
   * Unique Int identifier
   */
  uid: number;
  /**
   * Display tags
   */
  uiFilterTags: string[];
  /**
   * Asynchronous rendering option for large/complex layers
   */
  useAsyncRender: boolean;
};

/**
 * IntGrid value definition
 */
export type IntGridValueDefinition = {
  color: string;
  /**
   * Parent group identifier (0 if none)
   */
  groupUid: number;
  /**
   * User defined unique identifier
   */
  identifier?: null | string;
  tile?: TilesetRectangle | null;
  /**
   * The IntGrid value itself
   */
  value: number;
};

/**
 * IntGrid value group definition
 */
export type IntGridValueGroupDefinition = {
  /**
   * User defined color
   */
  color?: null | string;
  /**
   * User defined string identifier
   */
  identifier?: null | string;
  /**
   * Group unique ID
   */
  uid: number;
};

/**
 * Type of the layer as Haxe Enum Possible values: `IntGrid`, `Entities`, `Tiles`,
 * `AutoLayer`
 */
export type Type = 'IntGrid' | 'Entities' | 'Tiles' | 'AutoLayer';

/**
 * The `Tileset` definition is the most important part among project definitions. It
 * contains some extra informations about each integrated tileset. If you only had to parse
 * one definition section, that would be the one.
 */
export type TilesetDefinition = {
  /**
   * Grid-based height
   */
  __cHei: number;
  /**
   * Grid-based width
   */
  __cWid: number;
  /**
   * The following data is used internally for various optimizations. It's always synced with
   * source image changes.
   */
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  cachedPixelData?: { [key: string]: any } | null;
  /**
   * An array of custom tile metadata
   */
  customData: TileCustomMetadata[];
  /**
   * If this value is set, then it means that this atlas uses an internal LDtk atlas image
   * instead of a loaded one. Possible values: &lt;`null`&gt;, `LdtkIcons`
   */
  embedAtlas?: 'LdtkIcons' | null;
  /**
   * Tileset tags using Enum values specified by `tagsSourceEnumId`. This array contains 1
   * element per Enum value, which contains an array of all Tile IDs that are tagged with it.
   */
  enumTags: EnumTagValue[];
  /**
   * User defined unique identifier
   */
  identifier: string;
  /**
   * Distance in pixels from image borders
   */
  padding: number;
  /**
   * Image height in pixels
   */
  pxHei: number;
  /**
   * Image width in pixels
   */
  pxWid: number;
  /**
   * Path to the source file, relative to the current project JSON file<br/>  It can be null
   * if no image was provided, or when using an embed atlas.
   */
  relPath?: null | string;
  /**
   * Space in pixels between all tiles
   */
  spacing: number;
  /**
   * An array of user-defined tags to organize the Tilesets
   */
  tags: string[];
  /**
   * Optional Enum definition UID used for this tileset meta-data
   */
  tagsSourceEnumUid?: number | null;
  tileGridSize: number;
  /**
   * Unique Intidentifier
   */
  uid: number;
};

/**
 * In a tileset definition, user defined meta-data of a tile.
 */
export type TileCustomMetadata = {
  data: string;
  tileId: number;
};

/**
 * In a tileset definition, enum based tag infos
 */
export type EnumTagValue = {
  enumValueId: string;
  tileIds: number[];
};

export type EntityInstance = {
  /**
   * Grid-based coordinates (`[x,y]` format)
   */
  __grid: number[];
  /**
   * Entity definition identifier
   */
  __identifier: string;
  /**
   * Pivot coordinates  (`[x,y]` format, values are from 0 to 1) of the Entity
   */
  __pivot: number[];
  /**
   * The entity "smart" color, guessed from either Entity definition, or one its field
   * instances.
   */
  __smartColor: string;
  /**
   * Array of tags defined in this Entity definition
   */
  __tags: string[];
  /**
   * Optional TilesetRect used to display this entity (it could either be the default Entity
   * tile, or some tile provided by a field value, like an Enum).
   */
  __tile?: TilesetRectangle | null;
  /**
   * X world coordinate in pixels. Only available in GridVania or Free world layouts.
   */
  __worldX?: number | null;
  /**
   * Y world coordinate in pixels Only available in GridVania or Free world layouts.
   */
  __worldY?: number | null;
  /**
   * Reference of the **Entity definition** UID
   */
  defUid: number;
  /**
   * An array of all custom fields and their values.
   */
  fieldInstances: FieldInstance[];
  /**
   * Entity height in pixels. For non-resizable entities, it will be the same as Entity
   * definition.
   */
  height: number;
  /**
   * Unique instance identifier
   */
  iid: string;
  /**
   * Pixel coordinates (`[x,y]` format) in current level coordinate space. Don't forget
   * optional layer offsets, if they exist!
   */
  px: number[];
  /**
   * Entity width in pixels. For non-resizable entities, it will be the same as Entity
   * definition.
   */
  width: number;
};

export type FieldInstance = {
  /**
   * Field definition identifier
   */
  __identifier: string;
  /**
   * Optional TilesetRect used to display this field (this can be the field own Tile, or some
   * other Tile guessed from the value, like an Enum).
   */
  __tile?: TilesetRectangle | null;
  /**
   * Type of the field, such as `Int`, `Float`, `String`, `Enum(my_enum_name)`, `Bool`,
   * etc.<br/>  NOTE: if you enable the advanced option **Use Multilines type**, you will have
   * "*Multilines*" instead of "*String*" when relevant.
   */
  __type: string;
  /**
   * Actual value of the field instance. The value type varies, depending on `__type`:<br/>
   * - For **classic types** (ie. Integer, Float, Boolean, String, Text and FilePath), you
   * just get the actual value with the expected type.<br/>   - For **Color**, the value is an
   * hexadecimal string using "#rrggbb" format.<br/>   - For **Enum**, the value is a String
   * representing the selected enum value.<br/>   - For **Point**, the value is a
   * [GridPoint](#ldtk-GridPoint) object.<br/>   - For **Tile**, the value is a
   * [TilesetRect](#ldtk-TilesetRect) object.<br/>   - For **EntityRef**, the value is an
   * [EntityReferenceInfos](#ldtk-EntityReferenceInfos) object.<br/><br/>  If the field is an
   * array, then this `__value` will also be a JSON array.
   */
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  __value: any;
  /**
   * Reference of the **Field definition** UID
   */
  defUid: number;
  /**
   * Editor internal raw values
   */
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  realEditorValues: any[];
};

/**
 * This object describes the "location" of an Entity instance in the project worlds.
 *
 * IID information of this instance
 */
export type ReferenceToAnEntityInstance = {
  /**
   * IID of the refered EntityInstance
   */
  entityIid: string;
  /**
   * IID of the LayerInstance containing the refered EntityInstance
   */
  layerIid: string;
  /**
   * IID of the Level containing the refered EntityInstance
   */
  levelIid: string;
  /**
   * IID of the World containing the refered EntityInstance
   */
  worldIid: string;
};

/**
 * This object is just a grid-based coordinate used in Field values.
 */
export type GridPoint = {
  /**
   * X grid-based coordinate
   */
  cx: number;
  /**
   * Y grid-based coordinate
   */
  cy: number;
};

/**
 * IntGrid value instance
 */
export type IntGridValueInstance = {
  /**
   * Coordinate ID in the layer grid
   */
  coordId: number;
  /**
   * IntGrid value
   */
  v: number;
};

export type LayerInstance = {
  /**
   * Grid-based height
   */
  __cHei: number;
  /**
   * Grid-based width
   */
  __cWid: number;
  /**
   * Grid size
   */
  __gridSize: number;
  /**
   * Layer definition identifier
   */
  __identifier: string;
  /**
   * Layer opacity as Float [0-1]
   */
  __opacity: number;
  /**
   * Total layer X pixel offset, including both instance and definition offsets.
   */
  __pxTotalOffsetX: number;
  /**
   * Total layer Y pixel offset, including both instance and definition offsets.
   */
  __pxTotalOffsetY: number;
  /**
   * The definition UID of corresponding Tileset, if any.
   */
  __tilesetDefUid?: number | null;
  /**
   * The relative path to corresponding Tileset, if any.
   */
  __tilesetRelPath?: null | string;
  /**
   * Layer type (possible values: IntGrid, Entities, Tiles or AutoLayer)
   */
  __type: LayerType;
  /**
   * An array containing all tiles generated by Auto-layer rules. The array is already sorted
   * in display order (ie. 1st tile is beneath 2nd, which is beneath 3rd etc.).<br/><br/>
   * Note: if multiple tiles are stacked in the same cell as the result of different rules,
   * all tiles behind opaque ones will be discarded.
   */
  autoLayerTiles: TileInstance[];
  entityInstances: EntityInstance[];
  gridTiles: TileInstance[];
  /**
   * Unique layer instance identifier
   */
  iid: string;
  /**
   * **WARNING**: this deprecated value is no longer exported since version 1.0.0  Replaced
   * by: `intGridCsv`
   */
  intGrid?: IntGridValueInstance[] | null;
  /**
   * A list of all values in the IntGrid layer, stored in CSV format (Comma Separated
   * Values).<br/>  Order is from left to right, and top to bottom (ie. first row from left to
   * right, followed by second row, etc).<br/>  `0` means "empty cell" and IntGrid values
   * start at 1.<br/>  The array size is `__cWid` x `__cHei` cells.
   */
  intGridCsv: number[];
  /**
   * Reference the Layer definition UID
   */
  layerDefUid: number;
  /**
   * Reference to the UID of the level containing this layer instance
   */
  levelId: number;
  /**
   * An Array containing the UIDs of optional rules that were enabled in this specific layer
   * instance.
   */
  optionalRules: number[];
  /**
   * This layer can use another tileset by overriding the tileset UID here.
   */
  overrideTilesetUid?: number | null;
  /**
   * X offset in pixels to render this layer, usually 0 (IMPORTANT: this should be added to
   * the `LayerDef` optional offset, so you should probably prefer using `__pxTotalOffsetX`
   * which contains the total offset value)
   */
  pxOffsetX: number;
  /**
   * Y offset in pixels to render this layer, usually 0 (IMPORTANT: this should be added to
   * the `LayerDef` optional offset, so you should probably prefer using `__pxTotalOffsetX`
   * which contains the total offset value)
   */
  pxOffsetY: number;
  /**
   * Random seed used for Auto-Layers rendering
   */
  seed: number;
  /**
   * Layer instance visibility
   */
  visible: boolean;
};

/**
 * This structure represents a single tile from a given Tileset.
 */
export type TileInstance = {
  /**
   * Alpha/opacity of the tile (0-1, defaults to 1)
   */
  a: number;
  /**
   * Internal data used by the editor.<br/>  For auto-layer tiles: `[ruleId, coordId]`.<br/>
   * For tile-layer tiles: `[coordId]`.
   */
  d: number[];
  /**
   * "Flip bits", a 2-bits integer to represent the mirror transformations of the tile.<br/>
   * - Bit 0 = X flip<br/>   - Bit 1 = Y flip<br/>   Examples: f=0 (no flip), f=1 (X flip
   * only), f=2 (Y flip only), f=3 (both flips)
   */
  f: number;
  /**
   * Pixel coordinates of the tile in the **layer** (`[x,y]` format). Don't forget optional
   * layer offsets, if they exist!
   */
  px: number[];
  /**
   * Pixel coordinates of the tile in the **tileset** (`[x,y]` format)
   */
  src: number[];
  /**
   * The *Tile ID* in the corresponding tileset.
   */
  t: number;
};

/**
 * This section contains all the level data. It can be found in 2 distinct forms, depending
 * on Project current settings:  - If "*Separate level files*" is **disabled** (default):
 * full level data is *embedded* inside the main Project JSON file, - If "*Separate level
 * files*" is **enabled**: level data is stored in *separate* standalone `.ldtkl` files (one
 * per level). In this case, the main Project JSON file will still contain most level data,
 * except heavy sections, like the `layerInstances` array (which will be null). The
 * `externalRelPath` string points to the `ldtkl` file.  A `ldtkl` file is just a JSON file
 * containing exactly what is described below.
 */
export type Level = {
  /**
   * Background color of the level (same as `bgColor`, except the default value is
   * automatically used here if its value is `null`)
   */
  __bgColor: string;
  /**
   * Position informations of the background image, if there is one.
   */
  __bgPos?: LevelBackgroundPosition | null;
  /**
   * An array listing all other levels touching this one on the world map. Since 1.4.0, this
   * includes levels that overlap in the same world layer, or in nearby world layers.<br/>
   * Only relevant for world layouts where level spatial positioning is manual (ie. GridVania,
   * Free). For Horizontal and Vertical layouts, this array is always empty.
   */
  __neighbours: NeighbourLevel[];
  /**
   * The "guessed" color for this level in the editor, decided using either the background
   * color or an existing custom field.
   */
  __smartColor: string;
  /**
   * Background color of the level. If `null`, the project `defaultLevelBgColor` should be
   * used.
   */
  bgColor?: null | string;
  /**
   * Background image X pivot (0-1)
   */
  bgPivotX: number;
  /**
   * Background image Y pivot (0-1)
   */
  bgPivotY: number;
  /**
   * An enum defining the way the background image (if any) is positioned on the level. See
   * `__bgPos` for resulting position info. Possible values: &lt;`null`&gt;, `Unscaled`,
   * `Contain`, `Cover`, `CoverDirty`, `Repeat`
   */
  bgPos?: BgPos | null;
  /**
   * The *optional* relative path to the level background image.
   */
  bgRelPath?: null | string;
  /**
   * This value is not null if the project option "*Save levels separately*" is enabled. In
   * this case, this **relative** path points to the level Json file.
   */
  externalRelPath?: null | string;
  /**
   * An array containing this level custom field values.
   */
  fieldInstances: FieldInstance[];
  /**
   * User defined unique identifier
   */
  identifier: string;
  /**
   * Unique instance identifier
   */
  iid: string;
  /**
   * An array containing all Layer instances. **IMPORTANT**: if the project option "*Save
   * levels separately*" is enabled, this field will be `null`.<br/>  This array is **sorted
   * in display order**: the 1st layer is the top-most and the last is behind.
   */
  layerInstances?: LayerInstance[] | null;
  /**
   * Height of the level in pixels
   */
  pxHei: number;
  /**
   * Width of the level in pixels
   */
  pxWid: number;
  /**
   * Unique Int identifier
   */
  uid: number;
  /**
   * If TRUE, the level identifier will always automatically use the naming pattern as defined
   * in `Project.levelNamePattern`. Becomes FALSE if the identifier is manually modified by
   * user.
   */
  useAutoIdentifier: boolean;
  /**
   * Index that represents the "depth" of the level in the world. Default is 0, greater means
   * "above", lower means "below".<br/>  This value is mostly used for display only and is
   * intended to make stacking of levels easier to manage.
   */
  worldDepth: number;
  /**
   * World X coordinate in pixels.<br/>  Only relevant for world layouts where level spatial
   * positioning is manual (ie. GridVania, Free). For Horizontal and Vertical layouts, the
   * value is always -1 here.
   */
  worldX: number;
  /**
   * World Y coordinate in pixels.<br/>  Only relevant for world layouts where level spatial
   * positioning is manual (ie. GridVania, Free). For Horizontal and Vertical layouts, the
   * value is always -1 here.
   */
  worldY: number;
};

/**
 * Level background image position info
 */
export type LevelBackgroundPosition = {
  /**
   * An array of 4 float values describing the cropped sub-rectangle of the displayed
   * background image. This cropping happens when original is larger than the level bounds.
   * Array format: `[ cropX, cropY, cropWidth, cropHeight ]`
   */
  cropRect: number[];
  /**
   * An array containing the `[scaleX,scaleY]` values of the **cropped** background image,
   * depending on `bgPos` option.
   */
  scale: number[];
  /**
   * An array containing the `[x,y]` pixel coordinates of the top-left corner of the
   * **cropped** background image, depending on `bgPos` option.
   */
  topLeftPx: number[];
};

/**
 * Nearby level info
 */
export type NeighbourLevel = {
  /**
   * A lowercase string tipping on the level location (`n`orth, `s`outh, `w`est,
   * `e`ast).<br/>  Since 1.4.0, this value can also be `<` (neighbour depth is lower), `>`
   * (neighbour depth is greater) or `o` (levels overlap and share the same world
   * depth).<br/>  Since 1.5.3, this value can also be `nw`,`ne`,`sw` or `se` for levels only
   * touching corners.
   */
  dir: string;
  /**
   * Neighbour Instance Identifier
   */
  levelIid: string;
  /**
   * **WARNING**: this deprecated value is no longer exported since version 1.2.0  Replaced
   * by: `levelIid`
   */
  levelUid?: number | null;
};

export type BgPos = 'Unscaled' | 'Contain' | 'Cover' | 'CoverDirty' | 'Repeat';

export type LdtkTableOfContentEntry = {
  identifier: string;
  /**
   * **WARNING**: this deprecated value will be *removed* completely on version 1.7.0+
   * Replaced by: `instancesData`
   */
  instances?: ReferenceToAnEntityInstance[];
  instancesData: LdtkTocInstanceData[];
};

export type LdtkTocInstanceData = {
  /**
   * An object containing the values of all entity fields with the `exportToToc` option
   * enabled. This object typing depends on actual field value types.
   */
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fields: any;
  heiPx: number;
  /**
   * IID information of this instance
   */
  iids: ReferenceToAnEntityInstance;
  widPx: number;
  worldX: number;
  worldY: number;
};

/**
 * **IMPORTANT**: this type is available as a preview. You can rely on it to update your
 * importers, for when it will be officially available.  A World contains multiple levels,
 * and it has its own layout settings.
 */
export type World = {
  /**
   * Default new level height
   */
  defaultLevelHeight: number;
  /**
   * Default new level width
   */
  defaultLevelWidth: number;
  /**
   * User defined unique identifier
   */
  identifier: string;
  /**
   * Unique instance identifer
   */
  iid: string;
  /**
   * All levels from this world. The order of this array is only relevant in
   * `LinearHorizontal` and `linearVertical` world layouts (see `worldLayout` value).
   * Otherwise, you should refer to the `worldX`,`worldY` coordinates of each Level.
   */
  levels: Level[];
  /**
   * Height of the world grid in pixels.
   */
  worldGridHeight: number;
  /**
   * Width of the world grid in pixels.
   */
  worldGridWidth: number;
  /**
   * An enum that describes how levels are organized in this project (ie. linearly or in a 2D
   * space). Possible values: `Free`, `GridVania`, `LinearHorizontal`, `LinearVertical`, `null`
   */
  worldLayout: WorldLayout | null;
};

export type WorldLayout = 'Free' | 'GridVania' | 'LinearHorizontal' | 'LinearVertical';

export type Flag =
  | 'DiscardPreCsvIntGrid'
  | 'ExportOldTableOfContentData'
  | 'ExportPreCsvIntGridFormat'
  | 'IgnoreBackupSuggest'
  | 'PrependIndexToLevelFileNames'
  | 'MultiWorlds'
  | 'UseMultilinesType';

/**
 * Naming convention for Identifiers (first-letter uppercase, full uppercase etc.) Possible
 * values: `Capitalize`, `Uppercase`, `Lowercase`, `Free`
 */
export type IdentifierStyle = 'Capitalize' | 'Uppercase' | 'Lowercase' | 'Free';

/**
 * "Image export" option when saving project. Possible values: `None`, `OneImagePerLayer`,
 * `OneImagePerLevel`, `LayersAndLevels`
 */
export type ImageExportMode = 'None' | 'OneImagePerLayer' | 'OneImagePerLevel' | 'LayersAndLevels';
