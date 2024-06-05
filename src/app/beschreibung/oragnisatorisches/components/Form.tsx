"use client";

import { Organizationchannel } from "@/schemas/mongodb";
import { useCallback, useState } from "react";

import Textarea from "../../components/Textarea";
import CategorieSection from "./CategorieSection";
import MultiSectionArea from "./MultiSectionArea";

export type LinkWithId = {
  id: number;
  label: string;
  url: string;
};

export type MultiSectionWithId = {
  id: number;
  title: string;
  links: LinkWithId[];
};

type OrganizationchannelState = {
  title: string;
  body: string;
  openJobAds: MultiSectionWithId;
  closedJobAds: MultiSectionWithId;
  categories: MultiSectionWithId[];
};

const getNewCategoryRow = () => ({
  id: Date.now(),
  title: "",
  links: [],
});

const getNewLinkRow = () => ({
  id: Date.now(),
  label: "",
  url: "",
});

const addLinkRow = (links: LinkWithId[]) => {
  return [...links, getNewLinkRow()];
};
const updateLinkRow = (links: LinkWithId[], newLinkRow: LinkWithId) => {
  return links.map((link) => (link.id === newLinkRow.id ? newLinkRow : link));
};
const removeLinkRow = (links: LinkWithId[], id: number) => {
  return links.filter((link) => link.id !== id);
};

type Props = {
  data: OrganizationchannelState;
  getData: () => Promise<OrganizationchannelState>;
  updateData: (data: Organizationchannel) => Promise<{ success: boolean }>;
};

export default function Form(props: Props) {
  const [organizationchannel, setOrganizationchannel] =
    useState<OrganizationchannelState>(props.data);

  const updateTitleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrganizationchannel((prev) => ({ ...prev, title: e.target.value }));
  };
  const updateBodyHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrganizationchannel((prev) => ({ ...prev, body: e.target.value }));
  };

  const updateOpenJobAdsTitleHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOrganizationchannel((prev) => ({
      ...prev,
      openJobAds: {
        ...prev.openJobAds,
        title: e.target.value,
      },
    }));
  };
  const updateClosedJobAdsTitleHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOrganizationchannel((prev) => ({
      ...prev,
      closedJobAds: {
        ...prev.closedJobAds,
        title: e.target.value,
      },
    }));
  };
  const updateCategorieTitleHandler =
    (categorieId: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setOrganizationchannel((prev) => ({
        ...prev,
        categories: prev.categories.map((categorie) =>
          categorie.id === categorieId
            ? { ...categorie, title: e.target.value }
            : categorie
        ),
      }));
    };

  const addOpenJobAdsLinkRow = () => {
    setOrganizationchannel((prev) => ({
      ...prev,
      openJobAds: {
        ...prev.openJobAds,
        links: addLinkRow(prev.openJobAds.links),
      },
    }));
  };
  const updateOpenJobAdsLinkRow = useCallback((newLinkRow: LinkWithId) => {
    setOrganizationchannel((prev) => ({
      ...prev,
      openJobAds: {
        ...prev.openJobAds,
        links: updateLinkRow(prev.openJobAds.links, newLinkRow),
      },
    }));
  }, []);
  const removeOpenJobAdsLinkRow = (id: number) => {
    setOrganizationchannel((prev) => ({
      ...prev,
      openJobAds: {
        id: prev.openJobAds.id,
        title: prev.openJobAds.title,
        links: removeLinkRow(prev.openJobAds.links, id),
      },
    }));
  };

  const addClosedJobAdsLinkRow = () => {
    setOrganizationchannel((prev) => ({
      ...prev,
      closedJobAds: {
        ...prev.closedJobAds,
        links: addLinkRow(prev.closedJobAds.links),
      },
    }));
  };
  const updateClosedJobAdsLinkRow = useCallback((newLinkRow: LinkWithId) => {
    setOrganizationchannel((prev) => ({
      ...prev,
      closedJobAds: {
        ...prev.closedJobAds,
        links: updateLinkRow(prev.closedJobAds.links, newLinkRow),
      },
    }));
  }, []);
  const removeClosedJobAdsLinkRow = (id: number) => {
    setOrganizationchannel((prev) => ({
      ...prev,
      closedJobAds: {
        ...prev.closedJobAds,
        links: removeLinkRow(prev.closedJobAds.links, id),
      },
    }));
  };

  const addCategorieLinkRow = (categorieId: number) => () => {
    setOrganizationchannel((prev) => ({
      ...prev,
      categories: prev.categories.map((categorie) =>
        categorie.id === categorieId
          ? { ...categorie, links: addLinkRow(categorie.links) }
          : categorie
      ),
    }));
  };
  const updateCategorieLinkRow = useCallback(
    (categorieId: number) => (newLinkRow: LinkWithId) => {
      setOrganizationchannel((prev) => ({
        ...prev,
        categories: prev.categories.map((categorie) =>
          categorie.id === categorieId
            ? {
                ...categorie,
                links: updateLinkRow(categorie.links, newLinkRow),
              }
            : categorie
        ),
      }));
    },
    []
  );
  const removeCategorieLinkRow = (categorieId: number) => (id: number) => {
    setOrganizationchannel((prev) => ({
      ...prev,
      categories: prev.categories.map((categorie) =>
        categorie.id === categorieId
          ? { ...categorie, links: removeLinkRow(categorie.links, id) }
          : categorie
      ),
    }));
  };

  const addCategorie = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOrganizationchannel((prev) => ({
      ...prev,
      categories: [...prev.categories, getNewCategoryRow()],
    }));
  };
  const updateCategorie = (newCategorie: MultiSectionWithId) => {
    setOrganizationchannel((prev) => ({
      ...prev,
      categories: prev.categories.map((categorie) =>
        categorie.id === newCategorie.id ? newCategorie : categorie
      ),
    }));
  };
  const removeCategorie = (id: number) => {
    setOrganizationchannel((prev) => ({
      ...prev,
      categories: prev.categories.filter((categorie) => categorie.id !== id),
    }));
  };

  const cancelHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = await props.getData();
    setOrganizationchannel(data);
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await props.updateData(organizationchannel);

    const newData = await props.getData();
    setOrganizationchannel(newData);
  };
  const execHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const apikey = localStorage.getItem("apikey") ?? "";

    await fetch("api/organizationchannel", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apikey}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-4"
      onSubmit={submitHandler}
    >
      <div className="flex flex-col gap-1">
        <label>Titel</label>
        <Textarea
          placeholder="Titel"
          rows={3}
          value={organizationchannel.title}
          onChange={updateTitleHandler}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Beschreibung</label>
        <Textarea
          placeholder="Beschreibung"
          rows={3}
          value={organizationchannel.body}
          onChange={updateBodyHandler}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Offene Stellenanzeigen</label>
        <MultiSectionArea
          multiSection={organizationchannel.openJobAds}
          updateTitle={updateOpenJobAdsTitleHandler}
          addLinkRow={addOpenJobAdsLinkRow}
          updateLinkRow={updateOpenJobAdsLinkRow}
          removeLinkRow={removeOpenJobAdsLinkRow}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Geschlossende Stellenanzeigen</label>
        <MultiSectionArea
          multiSection={organizationchannel.closedJobAds}
          updateTitle={updateClosedJobAdsTitleHandler}
          addLinkRow={addClosedJobAdsLinkRow}
          updateLinkRow={updateClosedJobAdsLinkRow}
          removeLinkRow={removeClosedJobAdsLinkRow}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Weitere Kategorien</label>

        <div className="flex flex-col gap-2">
          {organizationchannel.categories.map((category) => (
            <CategorieSection
              key={category.id}
              category={category}
              updateCategorieTitleHandler={updateCategorieTitleHandler}
              updateCategorie={updateCategorie}
              removeCategorie={removeCategorie}
              addCategorieLinkRow={addCategorieLinkRow}
              updateCategorieLinkRow={updateCategorieLinkRow}
              removeCategorieLinkRow={removeCategorieLinkRow}
            />
          ))}

          <button
            className="col-span-full rounded-lg bg-secondary p-1 font-bold text-neutral-900 hover:bg-opacity-75"
            onClick={(e) => addCategorie(e)}
          >
            Kategorie hinzufügen
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="min-w-48 rounded-lg bg-tertiary py-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={cancelHandler}
        >
          Zurücksetzen
        </button>
        <button className="min-w-48 rounded-lg bg-primary py-1 font-bold text-neutral-900 hover:bg-opacity-75">
          Speichern
        </button>
        <button
          className="min-w-48 rounded-lg bg-quadro py-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={execHandler}
        >
          Teamspeak anpasen
        </button>
      </div>
    </form>
  );
}
