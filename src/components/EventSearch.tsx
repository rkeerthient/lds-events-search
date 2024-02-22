import {
  Matcher,
  provideHeadless,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  Coordinate,
  DropdownItem,
  Facets,
  FocusedItemData,
  Geolocation,
  MapboxMap,
  OnDragHandler,
  Pagination,
  RenderEntityPreviews,
  ResultsCount,
  SearchBar,
  VerticalResults,
} from "@yext/search-ui-react";
import { LngLat, LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { createCtx } from "../common/createContext";
import Event from "../types/events";
import EventCard from "./EventCard";
import Loader from "./Loader";
import MapPin from "./MapPin";
import searchConfig from "./searchConfig";
export interface Location {
  yextDisplayCoordinate?: Coordinate;
}

type MapContextType = {
  hoveredLocationId: string;
  setHoveredLocationId: (value: string) => void;
  clicked: string;
  setClicked: (value: string) => void;
};

export const [useMapContext, MapContextProvider] = createCtx<MapContextType>(
  "Attempted to call useMapContext outside of MapContextProvider"
);
type verticalKey = {
  verticalKey: string;
};
const EventSearch = ({ verticalKey }: verticalKey) => {
  const [hoveredLocationId, setHoveredLocationId] = useState("");
  const [clicked, setClicked] = useState("");
  const searchActions = useSearchActions();
  const filters = useSearchState((state) => state.filters.static);
  const [isLoading, setIsLoading] = useState(true);
  const [showFacets, setShowFacets] = useState(false);
  useEffect(() => {
    searchActions.setVertical(verticalKey);
    searchActions.executeVerticalQuery().then(() => setIsLoading(false));
  }, [searchActions]);

  const onDrag: OnDragHandler = React.useCallback(
    (center: LngLat, bounds: LngLatBounds) => {
      const radius = center.distanceTo(bounds.getNorthEast());
      const nonLocationFilters: SelectableStaticFilter[] =
        filters?.filter(
          (f) =>
            f.filter.kind !== "fieldValue" ||
            f.filter.fieldId !== "builtin.location"
        ) ?? [];
      const nearFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Near Current Area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          matcher: Matcher.Near,
          value: { ...center, radius },
        },
      };
      searchActions.setStaticFilters([...nonLocationFilters, nearFilter]);
      searchActions.executeVerticalQuery();
    },
    [filters, searchActions]
  );
  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "entity-preview-searcher",
  });

  const renderEntityPreviews: RenderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): JSX.Element | null => {
    const eventResults = verticalKeyToResults["events"]?.results.map(
      (result) => result.rawData
    ) as unknown as Event[];

    return eventResults ? (
      <div className="grid grid-cols-6 px-8  gap-2">
        {eventResults.map((result) => (
          <DropdownItem
            key={result.id}
            value={result.name}
            // onClick={() =>
            //   history.pushState(null, "", `/${result.landingPageUrl}`)
            // }
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <DropdownItem
              className="border"
              key={result.id}
              value={result.name}
              ariaLabel={dropdownItemProps.ariaLabel}
            >
              <a
                href={`${result.landingPageUrl}`}
                className="text-center "
                target="_blanks"
              >
                {result.c_heroImage ? (
                  <img
                    src={result.c_heroImage.url}
                    alt=""
                    className="h-auto w-32 mx-auto aspect-square"
                  />
                ) : (
                  result.c_photo && (
                    <img
                      src={result.c_photo.url}
                      alt=""
                      className="h-auto w-32 mx-auto aspect-square"
                    />
                  )
                )}
                <div className="text-sm h-10  mt-4">{result.name}</div>
              </a>
            </DropdownItem>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };
  return (
    <>
      <SearchBar
        placeholder="Search our Events"
        visualAutocompleteConfig={{
          entityPreviewSearcher: entityPreviewSearcher,
          includedVerticals: ["events"],
          renderEntityPreviews: renderEntityPreviews,
          universalLimit: { events: 6 },
          entityPreviewsDebouncingTime: 300,
        }}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <MapContextProvider
          value={{
            hoveredLocationId,
            setHoveredLocationId,
            clicked,
            setClicked,
          }}
        >
          <div className="flex flex-row">
            <div
              className="flex flex-col w-2/5 p-4 overflow-scroll relative"
              style={{ height: "95vh" }}
            >
              <div
                className="hover:cursor-pointer px-4 py-1 text-sm bg-[#027da5] text-white w-fit"
                onClick={(e) => setShowFacets(!showFacets)}
              >
                Facets & Filters
              </div>
              {showFacets ? (
                <div className="absolute inset-0 bg-white h-[95vh]">
                  <IoIosClose
                    onClick={(e) => setShowFacets(false)}
                    className="ml-auto h-8 w-8 mr-4 hover:cursor-pointer hover:border"
                  />
                  <Facets
                    customCssClasses={{ facetsContainer: "mr-10" }}
                    searchOnChange={true}
                  />
                  <div className="flex flex-row gap-4 mb-8">
                    <div
                      className="hover:cursor-pointer px-4 py-1 mt-4 bg-[#027da5] text-white w-fit"
                      onClick={(e) => setShowFacets(!showFacets)}
                    >
                      Apply
                    </div>
                    <div
                      className="hover:cursor-pointer px-4 py-1 mt-4 text-[#027da5] w-fit hover:underline"
                      onClick={(e) => setShowFacets(false)}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <ResultsCount />
                    <AppliedFilters />
                    <VerticalResults
                      CardComponent={EventCard}
                      customCssClasses={{
                        verticalResultsContainer: "flex flex-col gap-4",
                      }}
                    />
                    <div className="mt-4">
                      <Pagination />
                      <Geolocation
                        customCssClasses={{
                          iconContainer: "none",
                          geolocationContainer: "flex flex-col lg:flex-col",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className=" w-3/5 h-screen">
              <MapboxMap
                mapboxOptions={{
                  zoom: 20,
                }}
                mapboxAccessToken={
                  import.meta.env.YEXT_PUBLIC_MAP_API_KEY || ""
                }
                PinComponent={(props) => (
                  <MapPin
                    {...props}
                    hoveredLocationId={hoveredLocationId}
                    setHoveredLocationId={setHoveredLocationId}
                    clicked={clicked}
                    setClicked={setClicked}
                  />
                )}
              />
            </div>
          </div>
        </MapContextProvider>
      )}
    </>
  );
};

export default EventSearch;
const createPopUp1 = (data: any) => {
  data = data;
  return `<div 
  > <h3 class="uppercase bembo text-sm font-normal mb-2.5">
  ${data.name}
</h3>
 
</div>`;
};
