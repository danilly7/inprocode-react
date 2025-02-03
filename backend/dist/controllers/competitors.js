"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompetitor = exports.getCompetitors = void 0;
const competitors_1 = __importDefault(require("../models/competitors")); // Asegúrate de importar el modelo correctamente
const getCompetitors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    try {
        const result = yield competitors_1.default.findAndCountAll({
            limit: Number(limit),
            offset: (Number(page) - 1) * Number(limit),
        });
        res.json({
            total: result.count,
            pages: Math.ceil(result.count / Number(limit)),
            currentPage: Number(page),
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ups, there was an error when trying to get all the competitors',
        });
    }
});
exports.getCompetitors = getCompetitors;
const getCompetitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const competitor = yield competitors_1.default.findByPk(id);
        if (competitor) {
            res.json(competitor);
        }
        else {
            res.status(404).json({
                msg: `Competitor with id ${id} does NOT exist (yet)`,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ups, there was an error when trying to get the competitor',
        });
    }
});
exports.getCompetitor = getCompetitor;
