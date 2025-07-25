import { getFilterMostValueService } from "../services/db.service";
import {
  getResumeCategoryPerMonthService,
  getResumeCategoryService,
  getResumePerMonthService,
  getTotalCountForUserService,
} from "../services/resume.service";
import { CollectionName, TransactionName } from "../types/CollectionName.type";
import { GroupBy } from "../types/GroupBy.type";
import { RequestUser } from "../types/RequestUser.interface";
import { Response } from "express";

export const getResumeTransactionController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid;
  if (!uid) return res.status(401).json({ message: "No autorizado" });

  const { type, year, month, groupBy } = req.query;

  if (!type || (String(type) !== "incomes" && String(type) !== "expenses"))
    return res.status(400).json({ message: "Necesario especificar el tipo" });

  const parsedType = type as string;
  const parsedYear = year ? parseInt(year as string) : undefined;
  const parsedMonth = month ? parseInt(month as string) : undefined;
  const parsedGroupBy = groupBy ? (groupBy as GroupBy) : undefined;

  if (parsedType !== "incomes" && parsedType !== "expenses")
    return res.status(400).json({ message: "Tipo de transacción no válido" });

  try {
    if (parsedGroupBy === "category") {
      const resume = await getResumeCategoryService(
        uid,
        parsedType as CollectionName,
        parsedYear,
        parsedMonth
      );
      return res.status(200).json(resume);
    }

    if (parsedGroupBy === "categoryByMonth") {
      const resume = await getResumeCategoryPerMonthService(
        uid,
        parsedType as CollectionName,
        parsedYear
      );

      return res.status(200).json(resume);
    }


    return res
      .status(400)
      .json({ message: "No se ha indicado un grupBy válido" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getResumeTransactionPerMonth = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid
  if (!uid) return res.status(401).json({ message: "No authorizado" })

  const { type, year} = req.query;

  if (!type || (String(type) !== "incomes" && String(type) !== "expenses"))
    return res.status(400).json({ message: "Necesario especificar el tipo" });

  if (!year) return res.status(422).json({ message: "Necesario especificar el año del resumen "})

  const parsedType = type as TransactionName
  const parsedYear = parseInt(year as string)
  if (Number.isNaN(parsedYear)) {
    return res
      .status(400)
      .json({ message: "El año debe ser un número válido" });
  }

  try {
    const resumeYear = await getResumePerMonthService(uid, parsedType, parsedYear)
    return res.status(200).json({data: resumeYear})
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getTopTransactionController = async (
  req: RequestUser,
  res: Response
): Promise<any> => {
  const uid = req.user?.uid;
  if (!uid) return res.status(401).json({ message: "No autorizado" });

  const { type, limit, order, year, month } = req.query;

  const parsedType = type ? type as string : undefined

  if (!parsedType || (parsedType !== 'incomes' && parsedType !== 'expenses'))
    return res.status(400).json({ message: "Es necesario especificar un type válido" })

  const parsedYear = year ? parseInt(year as string) : undefined;
  const parsedMonth = month ? parseInt(month as string) : undefined;
  const parsedLimit = limit ? parseInt(limit as string) : undefined;
  const parsedOrder = order === 'asc' || order === 'desc' ? order : 'desc'

  try {
    const topResponse = await getFilterMostValueService(uid, parsedType, parsedOrder, parsedLimit, parsedYear, parsedMonth)

    return res.status(200).json(topResponse)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getTotalCountController = async (
  req: RequestUser,
  res: Response
) : Promise<any> => {
  const uid = req.user?.uid;
  if (!uid) return res.status(500).json({ message: "Usuario no identificado." });

  try {
    const counts = await getTotalCountForUserService(uid)
    res.status(200).json(counts)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}